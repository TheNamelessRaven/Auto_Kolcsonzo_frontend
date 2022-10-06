import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class CardBody extends Component {
    
        constructor(props) {
            super(props);
            this.state={
                errors:"",
                success:false,
            };
        }
        
    rent = (event) =>{
        const{car}=this.props
        //const{success,errors}=this.state;
        fetch(`http://localhost:8000/api/cars/${car.id}/rent`,{
            method: "POST",
            headers:{
            "Accept":"application/json",
            },
          }).then(async (response)=>{
            if(response.status===201){
              this.setState({
                success:true,
                errors:"",
              });
            }else {
              const data=await response.json();
              this.setState({
                errors:data.message,
                success:false,
              });
            }
            });
    };
    //state = {  } 
    render() { 
        const{car}=this.props;
        const{success,errors}=this.state;
        return (
            <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card-body">
                    <h2>{car.license_plate_number}</h2>
                    <h3>{car.brand}</h3>
                    <h4>{car.model}</h4>
                    <h5>{car.daily_cost}</h5>
                    <img src={`images/${car.brand}${car.model}.png`} alt={car.brand+car.model} with={200} height={200}  />
                    <button className="btn btn-primary center" onClick={this.rent}>Kölcsönzés</button>
                    <p>{success ? "Sikeres foglalás": errors !==""? errors: "" }</p>
                </div>
            </div>
        );
    }
}
 
export default CardBody;