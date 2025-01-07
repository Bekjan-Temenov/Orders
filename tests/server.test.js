import supertest from "supertest";
import server from "../server.js"

const request = supertest(server)

describe(' GET /api/products/get', () => {
    if('should return 200 status code' , async ()=> {
        const response = await request.get('/api/products/get');
        expect(response.status).toBe(200);
    });
    if('should return a JSON response' , async() => {
        const response = await request.get('/api/products/get');
        expect(response.body).toHaveProperty('message');
    });
})