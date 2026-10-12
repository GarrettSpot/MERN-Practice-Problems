const request = require('supertest');
const app = require('../src/api');

describe('Lok Sabha Voting System API', () => {
  it('should add a new MP', async () => {
    const res = await request(app).post('/mp').send({
      name: 'Rahul Gandhi',
      constituency: 'Wayanad',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Rahul Gandhi');
  });

  it('should allow MP to vote and prevent duplicate', async () => {
    const res1 = await request(app).post('/mp').send({
      name: 'Amit Shah',
      constituency: 'Gandhinagar',
    });
    const mpId = res1.body.id;

    const voteRes = await request(app).post('/vote').send({
      mpId,
      vote: 'yes',
    });
    expect(voteRes.status).toBe(200);

    const dupRes = await request(app).post('/vote').send({
      mpId,
      vote: 'no',
    });
    expect(dupRes.status).toBe(409);
  });

  it('should return correct vote results', async () => {
    const res = await request(app).get('/results');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('yes');
    expect(res.body).toHaveProperty('no');
    expect(res.body).toHaveProperty('abstain');
  });

  it('should return 404 for invalid MP id', async () => {
    const res = await request(app).post('/vote').send({
      mpId: 9999,
      vote: 'yes',
    });
    expect(res.status).toBe(404);
  });

  it('should return 400 for invalid vote type', async () => {
    const res1 = await request(app).post('/mp').send({
      name: 'Sonia Gandhi',
      constituency: 'Raebareli',
    });
    const mpId = res1.body.id;

    const res2 = await request(app).post('/vote').send({
      mpId,
      vote: 'maybe',
    });
    expect(res2.status).toBe(400);
  });
});
