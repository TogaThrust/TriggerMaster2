package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func start_mongo_service(MONGO_DB_URI, CLUSTER, COLLECTION string) (*mongo.Client, *mongo.Collection) {
	clientOptions := options.Client().ApplyURI(MONGO_DB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("Error starting MongoDB client", err)
	}
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Error connecting to MongoDB ATLAS", err)
	}
	fmt.Println("Connected to MongoDB ATLAS")
	collection := client.Database(CLUSTER).Collection(COLLECTION)
	return client, collection
}
