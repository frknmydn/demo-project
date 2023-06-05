import express, { Request, Response } from 'express';
import { Kafka, logLevel } from 'kafkajs';

const router = express.Router();

// Kafka bağlantısı ve istemci oluşturulması
const kafka = new Kafka({
  clientId: 'notification-consumer',
  brokers: ['kafka:9092'],
  logLevel: logLevel.ERROR
});

const consumer = kafka.consumer({ groupId: 'notification' });

router.get('/api/notification/get', async (req: Request, res: Response) => {
  const messages: string[] = [];

  // Kafka'ya bağlan
  await consumer.connect();

  // consumer  abone et
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  // Mesajları işle
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      messages.push(message.value?.toString() || '');
    },
  });

  // consumer kapat
  await consumer.disconnect();

  res.status(200).json({ messages });
});

export { router as getMessageRouter };

