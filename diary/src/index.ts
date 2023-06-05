import mongoose from 'mongoose'
import express from "express";
import { json } from "body-parser";
import {addDiaryPage} from "./routes/add-diary"
import { Kafka, logLevel } from 'kafkajs';

//import {app } from './app'

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(addDiaryPage)

const start = async () =>{
    try{
        
        await mongoose.connect('mongodb://diary-mongo-srv:27017/diary');
        console.log('connected to mongodb diary');
        
    }
    catch (err){
        console.log(err)
    }
}


app.listen(3000,() =>{
    console.log('listening on port 3001 hehe');
});

start();

async function createTopic() {
    // Kafka brokerlarının adreslerini belirtin
    const brokers = ['kafka-service:9092'];
  
    // KafkaJS istemcisini yapılandırın
    const kafka = new Kafka({ brokers });
  
    // KafkaJS admin istemcisini oluşturun
    const admin = kafka.admin();
  
    // Kafka admin istemcisine bağlanın
    await admin.connect();
  
    // Oluşturmak istediğiniz konunun yapılandırmasını belirtin
    const topic = {
      topic: 'my-topic', // Oluşturulacak konunun adı
      numPartitions: 1, // Bölümlerin sayısı
      replicationFactor: 1 // Replication faktörü
    };
  
    // Konuyu oluşturun
    await admin.createTopics({ topics: [topic] });
  
    // Kafka admin istemcisini kapatın
    await admin.disconnect();
  }


