import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clsn9687d0pz401up52fpfm5j/master";

const getSlider = async () => {
  const query = gql`
    query GetSlider {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getCategories = async () => {
  const query = gql`
  query GetCategories {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessList = async () => {
  const query = gql`
  query GetBusinessList {
    businessLists {
      name
      id
      email
      contactPerson
      category {
        name
      }
      adress
      about
      images {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessListByCategory = async (category) => {
  const query = gql`
  query GetBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      name
      id
      email
      contactPerson
      category {
        name
      }
      adress
      about
      images {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const createBooking = async (data) => {
  const mutationquery = gql`
  mutation MyMutation {
    createBooking(
      data: {bookingStatus: Booked, 
        businessList: {connect: {id: "`+data.businessid+`"}}, 
        date: "`+data.date+`", 
        time: "`+data.time+`", 
        userEmail: "`+data.userEmail+`", 
        userName: "`+data.userName+`", 
        userNote: "`+data.note+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, mutationquery);
  return result;
}

const getBookingInformation = async (userEmail) => {
  const query = gql`
  query GetUserBooking {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      userNote
      bookingStatus
      date
      id
      businessList {
        id
        images {
          url
        }
        name
        adress
        contactPerson
        email
        about
      }
    }
  }  
  `
  const result = await request(MASTER_URL, query);
  return result;
}

export default { getSlider, getCategories, getBusinessList, getBusinessListByCategory, createBooking, getBookingInformation }





// bookingStatus: Booked, 
//         businessList: {connect: {id: "`+data.businessid+`"}}, 
//         date: "`+data.date+`", 
//         time: "`+data.time+`", 
//         userEmail: "`+data.userEmail+`", 
//         userName: "`+data.userName+`"},
//         userNote: "`+data.note+`",