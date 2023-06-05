import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";

it("returns a 201 on successfull signup ", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tSDSADFcom",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid PASSWORD", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "d",
      })
      .expect(400);
  });

  it("returns a 400 with missing email and paswword", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
       
      })
      .expect(400);
  });

  it('5 disallows duplicate emails', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: ' password'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: ' password'
    })
    .expect(400);
  });

// kullanicinin basarili bir sekilde kaydedildigi durumda bir cerez olusturup olusturulmadigi kontrol etmek icin
it('sets a cookie after successfull sign up', async () =>{
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: ' password'
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})


//missin email test
it('missing email test 400', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      password: 'password'
    })
    .expect(400);
});


it('missing password test', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('hashing test geriye id donmedigi icin signup degismesi laizm', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test5@test.com',
      password: 'password1234'
    })
    .expect(201);

    console.log('Response body ID:', response.body.id);

    const user = await User.findById(response.body.id);

    console.log('User object:', user);

});


it('user to log in same credentials after signing up', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test6@test.com',
      password: 'password1234'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test6@test.com',
      password: 'password1234'
    })
    .expect(200);
});




