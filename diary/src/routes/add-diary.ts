import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Diary } from '../models/diary';
import { Kafka, logLevel } from 'kafkajs';
import { error } from 'console';

const router = express.Router();

// Kafka bağlantısı ve istemci oluşturulması
const kafka = new Kafka({
  clientId: 'diary',
  brokers: ['kafka:9092'],
  logLevel: logLevel.ERROR 
  
});
console.log('kafka baglandi')
const producer = kafka.producer();

router.post(
  '/api/diary/add',
  [
    body('header').isLength({ min: 4, max: 20 }).withMessage('Geçerli bir başlık giriniz.'),
    body('description').isLength({ min: 4, max: 300 }).withMessage('Açıklama 4-300 karakter arasında olmalıdır.')
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { header, picUrl, description } = req.body;

    try {
      // Veri ekleme
      const diary = Diary.build({ header, picUrl, description });
      await diary.save();

      //deneme verisi oluşturma
     

      // Veriyi Kafka'ya gönderme
      
      await producer.connect();
      //.then(async () => await producer.send(record))
      //.catch(error);
      
      
      await producer.send({
        topic: 'my-topic', // bu topic kafkada oluşturuldu
        messages: [
          { value: JSON.stringify({ header, description }) }
        ]
      }).catch(error);
      
     /*
      await producer.send({
        topic: 'my-topic', // Bu topic Kafka'da oluşturuldu
        messages: [
          { key: 'key1', value: 'hello world' },
          { key: 'key2', value: 'hey hey!' }
      ],
      });
      */
      
      

      await producer.disconnect();

      res.status(200).send(diary);
    } catch (error) {
      console.error('Veri gönderme hatası:', error);
      res.status(500).send({ error: 'Veri gönderme hatası' });
    }
  }
);

export { router as addDiaryPage };