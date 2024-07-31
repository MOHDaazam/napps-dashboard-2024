import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'; // Using Bootstrap Modal for simplicity
import { firebases } from '../../firebase';
import axios from 'axios';

// Define custom styles
const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    fontFamily: 'ubuntu-regular'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    minHeight: '100vh'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
  },
  cardContainer: {
    marginBottom: '1rem'
  },
  card: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px'
  },
  order_details_container: {
    marginBottom: '1rem'
  },
  order_no_txt: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem'
  },
  seller: {
    fontSize: '1rem',
    color: 'grey'
  },
  amount: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '0.5rem'
  },
  mrp: {
    fontSize: '1rem',
    color: 'grey'
  },
  created_time: {
    marginTop: '1rem'
  },
  customer_name: {
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  customer_address: {
    fontSize: '1rem',
    color: 'grey'
  },
  textCenter: {
    textAlign: 'center'
  }
};

const ORDER_STATUS = [
    {
      title: "Accept order",
      railBackgroundColor: "#50C878",
      railFillBackgroundColor: "#2E8B57",
      thumbIconBackgroundColor: "#FFFFFF",
      railFillBorderColor: "#50C878",
      railBorderColor: "#50C878",
      value: 0
    },
    {
      title: "On the way",
      railBackgroundColor: "#8f94b1",
      railFillBackgroundColor: "#b0c4de",
      thumbIconBackgroundColor: "#FFFFFF",
      railFillBorderColor: "#8f94b1",
      railBorderColor: "#8f94b1",
      value: 1
    },
    {
      title: "Assign delivery",
      railBackgroundColor: "#003b71",
      railFillBackgroundColor: "#cf1820",
      thumbIconBackgroundColor: "#FFFFFF",
      railFillBorderColor: "#292b2c",
      railBorderColor: "#292b2c",
      value: 2
    },
    {
      title: "Assign delivery",
      railBackgroundColor: "#003b71",
      railFillBackgroundColor: "#cf1820",
      thumbIconBackgroundColor: "#FFFFFF",
      railFillBorderColor: "#292b2c",
      railBorderColor: "#292b2c",
      value: 3
    }
  ];
  
  class OnGoingOrders extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        orders: [],
        order_status: 0,
        vendorName: "",
        swipeButtonLoading: false,
        isAgentsModalVisible: false,
        isOtpModalVisible: false,
        rejectOrderDetails: {},
        selectedAgent: "",
        orderOtp: "",
        deliveredOrderDetails: {},
        modelSnackStatus: false,
        otpModelSnackStatus: false,
        snackMsg: "",
        snackStatus: false,
        myLocation: {},
        cashbackExpiringDays: 0,
        focusedCard: "",
        emailApi: "",
        maxCashback: 0,
        assignDeliveryDetails: {},
        deliveryAgents: [],
        errorMessage: ""
      };
  
      
        // this._getLocationAsync();
      
    }
  
    componentDidMount() {
      this.getDeliveryAgents();
      this._getLocationAsync();
      this._retrieveOrders();
      this._retrieveCashbackExpiringMaxCashback();
      this._getEmailApi();
    }
  
    async _getEmailApi() {
      this.setState({ isLoading: true });
      const { firebaseDb } = await firebases();
      firebaseDb.ref("support/email_api").on("value", (snapshot) => {
        this.setState({
          emailApi: snapshot.val(),
          isLoading: false
        });
      });
    }
  
    async _setOrderStatus(order_id, customer_id, order_status, order_details = null, payment_mode = null) {
      this.setState({ swipeButtonLoading: true, isBtnDisabled: true });
  
      let status = {
        order_status: order_status
      };
  
      if (order_status === 2) {
        status["delivery_boy"] = 'pending';
      }
  
      if (order_status === -1) {
        status["rejection_reason"] = this.state.selectedAgent;
        status["rejected_date_time"] = String(new Date());
  
        const emails = "helloaonla@gmail.com";
        const sender = `[${order_details.order_type}]-Order Rejection`;
        const subject = `#${order_id} is rejected, placed by +91${customer_id}`;
        const message = `
          Order No: ${order_id} \n
          Order Amount : ${order_details.amount} \n
          Customer Mobile: ${customer_id} \n
          Customer Name : ${order_details.customer_name}\n
          Reason of Rejection : ${this.state.selectedAgent}\n
          Shopkeeper/Seller : ${order_details.vendor_name} \n
          Order Details : ${JSON.stringify(order_details.order)}\n
          Rejection Time : ${String(new Date())}\n
          Reference : ${order_details.meta_data}\n
          Rejected by : ${this.props.adminData.name}
        `;
  
        if (payment_mode.includes("ONLINE")) {
          status["payment_released"] = "no";
        }
  
        axios({
          method: "post",
          url: this.state.emailApi,
          data: {
            email: emails,
            message: message,
            subject: subject,
            sender: sender
          }
        }).then(response => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        });
      }
  
      const { firebaseDb, vendorName } = await firebases();
      firebaseDb.ref(`vendors/${vendorName}/all_orders/${order_id}`).update(status)
        .then(async () => {
          firebaseDb.ref(`users/${customer_id}/all_orders/${order_id}`).update(status)
            .then(async () => {
              if (order_status == 3) {
                this.setState({
                  snackMsg: "Order delivered, sending to Delivered order section...",
                  snackStatus: true
                });
              }
  
              setTimeout(() => {
                this.setState({
                  swipeButtonLoading: false,
                  selectedAgent: "",
                  isRejectModalVisible: false,
                  isBtnDisabled: false
                });
              }, 500);
            });
        });
    }
  
    getFormattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      let month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;
      let day = date.getDate().toString();
      day = day.length > 1 ? day : "0" + day;
      return `${month}/${day}/${year}`;
    }
  
    addDaysToDate(numberOfDaysToAdd) {
      const someDate = new Date();
      someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
      let mm = someDate.getMonth() + 1;
      mm = mm.length > 1 ? mm : "0" + mm;
      const dd = someDate.getDate();
      const y = someDate.getFullYear();
      return `${mm}/${dd}/${y}`;
    }
  
    async _setRewardsOfUser(customer_id, reward_amount) {
      let rewardAmount = Number(reward_amount);
      if (rewardAmount <= 0) {
        return;
      }
      if (rewardAmount > this.state.maxCashback) {
        rewardAmount = this.state.maxCashback;
      }
  
      const { firebaseDb } = await firebases();
      firebaseDb.ref(`users/${customer_id}/my_rewards/${Math.floor(Date.now() / 1000)}`).set({
        amount: Number(rewardAmount),
        type: "credited",
        created_date: this.getFormattedDate(),
        expiry_date: this.addDaysToDate(this.state.cashbackExpiringDays),
        timestamp: Math.floor(Date.now() / 1000),
        seller: this.state.vendorName
      }).then(async () => {
        firebaseDb.ref(`users/${customer_id}/expoPushtoken`).on("value", snapshot => {
        //   sendPushNotification(snapshot.val(), `You got a cashback of ₹ ${rewardAmount}`, "Use this amount before it expires, visit Rewards section for more");
        });
      });
    }
  
    async _retrieveCashbackExpiringMaxCashback() {
      this.setState({ isLoading: true });
      const { firebaseDb } = await firebases();
      try {
        // await AsyncStorage.getItem("vendorName").then(async vendorName => {
        //   if (vendorName !== null) {
        //     firebaseDb.ref(`vendors/${vendorName}`).on("value", snapshot => {
        //       this.setState({
        //         cashbackExpiringDays: snapshot.val().cashbackExpiringDays,
        //         maxCashback: Number(snapshot.val().maxCashback),
        //         isLoading: false
        //       });
        //     });
        //   }
        // });
      } catch (error) {
        alert("Something went wrong");
      }
    }
  
    async _retrieveOrders() {
      const { firebaseDb } = await firebases();
      try {
        firebaseDb.ref("vendors/").on("value", snapshot => {
          let orders = [];
          snapshot.forEach(childSnapshot => {
            const vendorObject = childSnapshot.val()
            if (vendorObject.all_orders) {
              for (const [orderId, order] of Object.entries(vendorObject.all_orders)) {
                if (order.order_status === 2 && order.vendor_name !== order.delivery_management) {
                  orders.push(order)
                }
              }
            }
          });
          this.setState({
            orders,
            isLoading: false
          });
        });
      } catch (error) {
        alert("Something went wrong");
      }
    }
  
    async getDeliveryAgents() {
      const { firebaseDb } = await firebases();
      firebaseDb.ref("deliveryagents/").on("value", snapshot => {
        let deliveryAgents = [];
        snapshot.forEach(childSnapshot => {
          deliveryAgents.push(`${childSnapshot.val().name},${childSnapshot.val().mobile}`)
        });
        this.setState({ deliveryAgents });
      });
    }
  
    async _getLocationAsync() {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     this.setState({
    //       errorMessage: "Permission to access location was denied"
    //     });
    //   }
  
    //   this.setState({ isLoading: true });
    //   let location;
    //   let locationSuccess = false;
  
    //   while (!locationSuccess) {
    //     try {
    //       location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    //       locationSuccess = true;
    //     } catch (ex) {
    //       console.log("Location retrying...");
    //     }
    //   }
  
    //   this.setState({ myLocation: location, isLoading: false });
    }
  
    render() {
    const { isLoading, orders, myLocation } = this.state;

    return (
      <div style={styles.container}>
        {/* Toolbar */}
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Assign delivery agents</span>
        </nav>

        {/* Loading spinner */}
        {isLoading ? (
          <div style={styles.loading}>
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Orders list */}
            {orders.length > 0  ? (
              <div>
                {orders.map((order, key) => (
                  <div key={key} style={styles.cardContainer}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Order ID - {order.order_no}</h5>
                        {order.order.map((item, index) => (
                          <p key={index} className="card-text">
                            {item.dish_name} x {item.quantity}
                          </p>
                        ))}
                        <p className="card-text">Seller: {order.vendor_name}</p>
                        <p className="card-text">Amount: ₹ {order.amount}</p>
                        <p className="card-text">MRP: ₹ {order.mrp}</p>
                        <p className="card-text">Created Time: {order.created_time}</p>
                      </div>
                      <div className="card-footer">
                        {order.order_status !== -1 ? (
                          <button className="btn btn-primary mr-2">
                            {/* {ORDER_STATUS[order.order_status].title} */}
                          </button>
                        ) : (
                          <button className="btn btn-danger" disabled>
                            REJECTED
                          </button>
                        )}
                        <button
                          className="btn btn-info"
                          onClick={() => this.setState({ isAgentsModalVisibile: true })}
                        >
                          Assign Delivery Agent
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.textCenter}>No recent orders to track.</p>
            )}
          </>
        )}

        {/* Modal for assigning delivery agents */}
        <Modal
          show={this.state.isAgentsModalVisibile}
          onHide={() => this.setState({ isAgentsModalVisibile: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select delivery agent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Agent selection form */}
            <form>
              {this.state.deliveryAgents.map((agent, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="selectedAgent"
                    id={`agent-${index}`}
                    value={agent}
                    checked={this.state.selectedAgent === agent}
                    onChange={() => this.setState({ selectedAgent: agent })}
                  />
                  <label className="form-check-label" htmlFor={`agent-${index}`}>
                    {agent}
                  </label>
                </div>
              ))}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => this.setState({ isAgentsModalVisibile: false, selectedAgent: '' })}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!this.state.selectedAgent) {
                  this.setState({ snackMsg: 'Please select an agent!', modelSnackStatus: true });
                  return;
                } else {
                  this.initiateDeliveryAssign();
                }
              }}
            >
              Assign
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default OnGoingOrders;
