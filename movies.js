// Movie class to represent a movie
class Movie {
    constructor(title, genre, availableCopies) {
      this.title = title;
      this.genre = genre;
      this.availableCopies = availableCopies;
    }
  }
  
  // Customer class to represent a customer
  class Customer {
    constructor(name, membershipType) {
      this.name = name;
      this.membershipType = membershipType;
    }
  }
  
  // Rental class to represent a rental transaction
  class Rental {
    constructor(customer, movie, rentalDays) {
      this.customer = customer;
      this.movie = movie;
      this.rentalDays = rentalDays;
      this.returned = false;
      this.calculateRentalCost();
    }
  
    calculateRentalCost() {
      const baseRentalCost = 2; // Base cost per day
      this.totalCost = baseRentalCost * this.rentalDays;
    }
  
    returnMovie() {
      this.returned = true;
    }
  }
  
  // MovieStore class to manage the movie store operations
  class MovieStore {
    constructor() {
      this.movies = [];
      this.customers = [];
      this.rentals = [];
    }
  
    addMovie(title, genre, availableCopies) {
      const movie = new Movie(title, genre, availableCopies);
      this.movies.push(movie);
      return movie;
    }
  
    addCustomer(name, membershipType) {
      const customer = new Customer(name, membershipType);
      this.customers.push(customer);
      return customer;
    }
  
    rentMovie(customer, movie, rentalDays) {
      if (movie.availableCopies > 0) {
        const rental = new Rental(customer, movie, rentalDays);
        this.rentals.push(rental);
        movie.availableCopies--;
        return rental;
      } else {
        console.log("Sorry, this movie is currently out of stock.");
      }
    }
  
    returnMovie(rental) {
      if (!rental.returned) {
        rental.returnMovie();
        const movie = rental.movie;
        movie.availableCopies++;
        console.log(`Movie "${movie.title}" returned successfully.`);
      } else {
        console.log("This movie has already been returned.");
      }
    }
  
    displayMovies() {
      console.log("Available Movies:");
      this.movies.forEach(movie => {
        console.log(`${movie.title} - ${movie.genre} - ${movie.availableCopies} copies available`);
      });
    }
  
    displayCustomers() {
      console.log("Customers:");
      this.customers.forEach(customer => {
        console.log(`${customer.name} - ${customer.membershipType} member`);
      });
    }
  
    displayRentals() {
      console.log("Active Rentals:");
      this.rentals.forEach(rental => {
        console.log(`${rental.customer.name} rented "${rental.movie.title}" for ${rental.rentalDays} days`);
      });
    }
  }
  
  // Example usage:
  
  const movieStore = new MovieStore();
  
  const movie1 = movieStore.addMovie("Into The Badland", "Action", 5);
  const movie2 = movieStore.addMovie("The Good Doctor", "Drama", 3);
  
  const customer1 = movieStore.addCustomer("Ezeh Livinus", "Gold");
  const customer2 = movieStore.addCustomer("Jennifer Obi", "Silver");
  
  movieStore.displayMovies();
  movieStore.displayCustomers();
  
  const rental1 = movieStore.rentMovie(customer1, movie1, 3);
  const rental2 = movieStore.rentMovie(customer2, movie2, 2);
  
  movieStore.displayRentals();
  
  movieStore.returnMovie(rental1);
  
  movieStore.displayMovies();
  movieStore.displayRentals();
  