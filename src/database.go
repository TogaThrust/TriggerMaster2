package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func start_mongo_service(MONGO_DB_URI, MONGO_DB_SECRET, CLUSTER, COLLECTION string) (*mongo.Client, *mongo.Collection) {
	clientOptions := options.Client().ApplyURI(fmt.Sprintf(MONGO_DB_URI, MONGO_DB_SECRET, CLUSTER))
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("Error starting MongoDB client", err)
	}
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Error connecting to MongoDB ATLAS", err)
	}
	collection := client.Database(CLUSTER).Collection(COLLECTION)
	return client, collection
}
