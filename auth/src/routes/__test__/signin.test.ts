import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";

it('fails when no email', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400);
});


  it('fails when false password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

      await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdfasd'
    })
    .expect(400);
    });


    it('should return cookie when signgin in correctly', async () => {
        await request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: 'password'
          })
          .expect(201);
      
        const response = await request(app)
          .post('/api/users/signin')
          .send({
            email: 'test@test.com',
            password: 'password'
          })
          .expect(200);
      
        expect(response.get('Set-Cookie')).toBeDefined();
      });

      it('email yoksa 400', async () => {
        await request(app)
          .post('/api/users/signup')
          .send({
            password: 'password123'
          })
          .expect(400);
    });



      


