package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func store_user(user User) error {
	encryptedPassword, err := encrypt_string(user.Password)
	if err != nil {
		return err
	}
	user.Password = encryptedPassword
	encryptedUsername, err := encrypt_string(user.Username)
	if err != nil {
		return err
	}
	user.Username = encryptedUsername
	client, collection := db_init()
	defer client.Disconnect(context.Background())
	// TODO implement last updated here
	var returnedUser User
	filter := bson.M{"Username": user.Username}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err = collection.FindOne(ctx, filter).Decode(&returnedUser)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// TODO implement hashing for username as a key
			insertResult, err := collection.InsertOne(context.Background(), user)
			if err != nil {
				return err
			}
			user.ID = insertResult.InsertedID.(primitive.ObjectID)
			return nil
		} else {
			log.Fatal(err)
		}
		return err
	}
	if returnedUser.Password != user.Password {
		update := bson.M{"$set": bson.M{"Password": user.Password}}
		_, err := collection.UpdateOne(context.Background(), filter, update)
		if err != nil {
			return err
		}
	}
	return nil
}

func db_init() (*mongo.Client, *mongo.Collection) {
	MONGO_DB_URI := os.Getenv("MONGO_DB_URI")
	MONGO_DB_SECRET := os.Getenv("MONGO_DB_SECRET")
	CLUSTER := "Main-Cluster-0"
	COLLECTION := "Users"
	client, collection := start_mongo_service(fmt.Sprintf(MONGO_DB_URI, MONGO_DB_SECRET, CLUSTER), CLUSTER, COLLECTION)
	return client, collection
}
