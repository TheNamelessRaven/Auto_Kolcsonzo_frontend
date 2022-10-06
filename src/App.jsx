import React,{Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import CardBody from "./CardBody";


class App extends Component {
   constructor(props){
    super(props);
    this.state={
      cars:[],
      newcar:{
        license_plate_number: "",
        brand: "",
        model: "",
        daily_cost: "",
      },
      errors: ""
    };
  }
    componentDidMount(){
      this.listCars();
    }
  
    listCars=()=>{
      fetch("http://localhost:8000/api/cars").then(async response => {
      if(response.status===200){
        const data=await response.json();
        this.setState({
          cars: data.data
      });
      }
      })
    }
   license_plate_number = (event) => {
    const new_plate=event.target.value;
    const { newcar }=this.state;
    this.setState({
      
      newcar: 
      {
      license_plate_number:new_plate,
      brand:newcar.brand,
      model:newcar.model,
      daily_cost:newcar.daily_cost,
      }
      
    });
   }
   model = (event) => {
    const new_model=event.target.value;
    const { newcar }=this.state;
    this.setState({
      
      newcar: 
      {
      license_plate_number:newcar.license_plate_number,
      brand:newcar.brand,
      model:new_model,
      daily_cost:newcar.daily_cost,
      }
      
    });
   }
   brand = (event) => {
    const new_brand=event.target.value;
    const { newcar }=this.state;
    this.setState({
      
      newcar: 
      {
      license_plate_number:newcar.license_plate_number,
      brand:new_brand,
      model:newcar.model,
      daily_cost:newcar.daily_cost,
      }
      
    });
   }
   daily_cost = (event) => {
    const new_daily=event.target.value;
    const { newcar }=this.state;
    this.setState({
      
      newcar: 
      {
      license_plate_number:newcar.license_plate_number,
      brand:newcar.brand,
      model:newcar.model,
      daily_cost:new_daily,
      }
      
    });
   }
   createCar=(event)=>{
    //const {errors}=this.state;
    const {newcar}=this.state;
    fetch("http://localhost:8000/api/cars",{
      method: "POST",
      headers:{
      "Content-type":"application/json",
      "Accept":"application/json",
      },
      body: JSON.stringify(newcar)
    }).then(async (response)=>{
      if(response.status===201){
        this.setState({
          newcar:{
            license_plate_number: "",
            brand: "",
            model: "",
            daily_cost: "",
          }
        });
        this.listCars();
      }else{
        const data=await response.json();
        this.setState({
          errors:data.message
        });
      }
      });
   }
    
  render() {
    const {cars,newcar,errors}=this.state;
    console.log(newcar);
    const errorAlert= <div className="alert alert-danger">{errors}</div>
    //console.log(this.state);
    const carList=[];
    cars.forEach((car)=>{
      carList.push(<CardBody car={car} key={car.id}/>);
    })
    return (
      <div className="container">
      <header>
      <nav className="navbar navbar-expand">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#autoform" className="nav-link">Kocsi felvétele</a>
          </li>
          <li className="nav-item">
            <a href="https://petrik.hu/" className="nav-link">Petrik Honlapja</a>
          </li>
        </ul>
      </nav>
      <h1>Petrik Autókölcsönző</h1>
      </header>
      <main className="mt-3 mb-3">
        <section className="row">
          {carList}
        </section>
        <section id='autoform'>
          <h2>Új kocsi felvétele</h2>
          {errorAlert!==""? errorAlert:""}
          <div className="mb-3">
          <label htmlFor="license_plate_number" id="license_plate_number">Rendszám</label>
          <input 
          type="text" 
          name="license_plate_number" 
          id="license_plate_number" 
          placeholder="rendszám" 
          value={newcar.license_plate_number} 
          onInput={this.license_plate_number}
          className="form-control"
          />
          </div>
           <div className="mb-3">
          <label htmlFor="Brand" id="Brand">Márka</label>
          <input 
          type="text" 
          name="brand" 
          id="brand" 
          placeholder="Márka" 
          value={newcar.brand} 
          onInput={this.brand}
          className="form-control"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="Model" id="Model">Modell</label>
          <input 
          type="text" 
          name="model" 
          id="model" 
          placeholder="Model" 
          value={newcar.model} 
          onInput={this.model}
          className="form-control"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="daily_cost" id="daily_cost">Napi Díj</label>
          <input 
          type="number" 
          name="daily_cost" 
          id="daily_cost" 
          placeholder="Napi Díj" 
          value={newcar.daily_cost} 
          onInput={this.daily_cost}
          className="form-control"
          />
          </div>
          <button className="btn btn-primary"onClick={this.createCar}>Feltöltés</button>
        </section>
      </main>
      <footer>Készítette Mándly Mánuel Kristóf</footer>

      </div>
    );
  }
}
 
export default App;