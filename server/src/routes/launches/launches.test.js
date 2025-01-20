const request = require('supertest');
const app = require('../../app')
const {mongoConnect,mongoDisconnect}=require("../../services/mongo");
const { loadPlanetData } = require('../../model/planets_model');
const {loadPlanetData}=require("../../model/planets_model")

describe('Launches api',()=>{
    beforeAll(async ()=>{
        await mongoConnect();
        loadPlanetData();
    });

    afterAll(async ()=>{
        await mongoDisconnect();
    })
    describe('Test GET /launches',()=>{
        test('It should respond with 200 success',async ()=>{
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type',/json/)
            .expect(200);
    
        })
    })
    
    
    describe('Test POST /launches',()=>{
    
        const completeLaunchDate={
            mission:'USSS',
            rocket:'MCCC',
            target:'Kepler-62 f',
            launchDate:'January 4, 2030'
        }
    
        const launchDataWithooutDate={
            mission:'USSS',
            rocket:'MCCC',
            target:'Kepler-62 f',
        };
    
    
        const launchDataWithoutInvalidDate={
            mission:'USSS',
            rocket:'MCCC',
            target:'Kepler-62 f',
            launchDate:'zoot'
        }
    
        test('It should response with 201 created',async ()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchDate)
            .expect('Content-Type',/json/)
            .expect(201)
    
            const requestDate =new  Date(completeLaunchDate.launchDate).valueOf();
            const responseDate =new Date(response.body.launchDate).valueOf();
    
            expect(requestDate).toBe(responseDate)
            expect(response.body).toMatchObject(launchDataWithooutDate)
        })
    
    
        test('It should catch missing required properties',async ()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithooutDate)
            .expect('Content-Type',/json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error:'Missing required launch property',
            })
        })
        test('It should catch invalid dates',async ()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutInvalidDate)
            .expect('Content-Type',/json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error:'Invalid launch date',
            })
        })
    })
})


