import request from 'supertest';
import { app } from '../../app';

it('should return user info', async () => {
  
  const cookie = await global.signin();

    const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie',cookie)
    .send()
    .expect(200);

  console.log(response)
});