import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";

// it("returns a 201 on successfull signout ", async () => {
//     return request(app)
      
//   });

  it('cookie gonna be cleared after signinout', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);
  
    expect(response.get('Set-Cookie')[0]).toEqual(
      'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
      //sunucunun cerez silmek icin kullandigi http yanit basligidir.
      
    );
  });

