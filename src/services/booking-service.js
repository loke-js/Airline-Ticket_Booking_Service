const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const {BookingRepository} = require('../repository/index');
const axios = require('axios');

const { ServiceError } = require('../utils/errors/index');

class BookingService {
    constructor(){
        this.bookingRepository =new BookingRepository();
    }

    async createBooking(data){
        try{
            const flightId = data.flightId;
            let getFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getFlightRequestUrl);
            const flightData = flight.data.data;
            let priceOfTheFlight =flightData.price;
            if(data.noOfSeats> flightData.totalSeats){
                throw new ServiceError('something went wrong int the booking process',"Insufficient number of seats");
            }
             const totalCost = (priceOfTheFlight)*(data.noOfSeats);
             const bookingPayload =  {...data,totalCost};
             const booking = await this.bookingRepository.create(bookingPayload);
             console.log("booking ",booking);
             const  updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            //  console.log(updateFlightRequestUrl);
             await axios.patch(updateFlightRequestUrl,{totalSeats :flightData.totalSeats-booking.noOfSeats});
             const finalBooking=await this.bookingRepository.update(booking.id,{status:"Booked"});
             return finalBooking;
        }catch(error){
            console.log(error);
            if(error.name=='RepositoryError' || error.name=='ValidationError'){
                throw error; 
            }
            throw new ServiceError();
        }
    }
}

 

module.exports = BookingService;