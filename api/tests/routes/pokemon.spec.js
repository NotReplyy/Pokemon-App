const { expect, assert } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

const agent = session(app);
const pokemon = {
  id: uuidv4(),
  name: 'jeison',
  weight: 250,
  height: 25
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)))


  describe('GET /pokemons', () => {
    it('should get 200', (done) => {
      agent
      .get('/pokemons')
      .expect(200)
      .expect('Content-Type', /json/)
      done()
    });
  });


  describe('GET /pokemons?name=something', () => {
    it('Should can handle query params', () => 
      agent
      .get('/pokemons/?name=bulbasaur')
      .expect(200)
      .expect('Content-Type', /json/)
    );  
    it('should response with 404 if the pokemon is not found', () => 
      agent.get('/pokemons/?name=Sergio').expect(404)
    );
  })


  describe('GET /pokemons/:idPokemon', () => {
    it('Should get 200', (done) => {
      agent.get('/pokemons/3').expect(200)
      done()
    });
    it('Should response with 404 if the pokemon is not found', (done) => {
      agent.get('/pokemons/ashketchup').expect(404)
      done()
    })
  }); 
});


describe('Type routes', () => {
  before(() =>
      conn
      .authenticate()
      .catch((err) =>
          console.error('Unable to connect to the database:', err)
      )
  );


  describe('GET /types', () => {
      it('Should get 200', () => agent.get('/types').expect(200));
      it('Should get a json Content.type', () => 
          agent.get('/types').expect('Content-type', /json/).expect(200)
      );
      it('Should insert from api types to our DB', (done) => {
          agent
          .get('/types')
          .expect('Content-type', /json/)
          .expect(200)
          .then(response => response.body)
          .then(types => {
              assert.ok(types.length >= 19)
              done()
          })
          .catch(err => done(err))
      });
  });
});