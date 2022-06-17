import app from "./app"
import "./db"
import { seedProducts } from "./seeder"

app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`)
    seedProducts()
});