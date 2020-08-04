const request = require("supertest");

const app = require("../../app");

const newToDo = require("../mockData/todo.json");

const endpointUrl = "/todos/";
let todo,todoID;
const testData = { title: "Make integration test for PUT", done: true };
describe(endpointUrl, () =>
{
   
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);
    
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        todo = response.body[0];
      });
      test('GETBYID ' + endpointUrl,async()=>{
        const response = await request(app).get(endpointUrl + todo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(todo.title);
        expect(response.body.done).toBe(todo.done);
    });
    test("TO do get by id does not exist", async()=>{
        const response = await request(app).get(endpointUrl + "5f29b6e76947e80984af095d");
        expect(response.statusCode).toBe(404);
        
    });
    it("POST " + endpointUrl,async ()=>{

       const response = await request(app).post(endpointUrl).send(newToDo);
       expect(response.statusCode).toBe(201);
       expect(response.body.title).toBe(newToDo.title);
       expect(response.body.done).toBe(newToDo.done);
       todoID = response.body._id;
    
    });
    it("Should return 500 with malformed POST request" + endpointUrl, async ()=>{
        const response = await request(app).post(endpointUrl).send({"title":"Missing Done Property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message : "Todo validation failed: done: Path `done` is required."
        })
    })
    it("UPDATE " + endpointUrl,async ()=>{
        
        const response = await request(app).put(endpointUrl + todoID).send(testData);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
 
     });
     test("TO do update by id does not exist", async()=>{
        
        const response = await request(app).put(endpointUrl + "5f29b6e76947e80984af095d").send(testData);
        expect(response.statusCode).toBe(404);
        
    });
    it("DELETE " + endpointUrl,async ()=>{
        const response = await request(app).delete(endpointUrl + todoID);;
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
 
     });
     test("TO do delete by id does not exist", async()=>{
       const response = await request(app).put(endpointUrl + "5f29b6e76947e80984af095d");
        expect(response.statusCode).toBe(404);
        
    });

});