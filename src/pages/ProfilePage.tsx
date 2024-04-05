import { useSelector } from 'react-redux';
import { ProfilePng } from '../index';
import "./styles/profilePage.css"; 

export default function ProfilePage(){
const userDetails = useSelector((state:any)=>state.user.userDetails)

    let fetchUserInfo = false;
    let userRole = userDetails.role;
    let accountInfo = {
        firstName : userDetails.first_name,
        lastName : userDetails.last_name,
        email : userDetails.email,
    };
    let contactInfo = {
        phone : "9456784567",
        address1 : "Gachibowli",
        address2 : "Nanakramguda",
        city : "Hyderabad",
        state : "Telangana",
        country : "India",
        pincode : "500019"
    }
    return(
        <div className='total-container'>
        <div className="row">
        <div className="col-md-12">
          <div className="row pt-2 px-3 ml-0 headerSection">
            <div className="col-lg-12 col-md-12">
              <h5 className="pt-1">Profile</h5>
            </div>
          </div>
          {fetchUserInfo && 
          (<div className="row">
            <div className="col-lg-12 col-md-12 text-center">
                <div className="row text-center mt-5">
                    <div className="col-md-12 mb-2">
                    </div>
                    <div className="col-md-12 text-center">
                        <h5>Data Loading...</h5>
                    </div>
                </div>
            </div>
          </div>)}
          {!fetchUserInfo && 
          (<div className="row zeroMargin">
            <div className="col-lg-4 col-md-4 leftSection font14">
              <div className="row">
                <div className="col-lg-12 col-md-12 text-center">
                    <img className="image" src={ProfilePng} alt="profile" />
                </div>
              </div>
              <div className="row pl-4">
                <div className="col-lg-12 col-md-12">
                    <span>Name</span>
                </div>
                <div className="col-lg-12 col-md-12">
                    <strong>{ accountInfo?.firstName } { accountInfo?.lastName }</strong>
                </div>
              </div>
              <div className="row pl-4 mt-2">
                <div className="col-lg-12 col-md-12">
                    <span>Role</span>
                </div>
                <div className="col-lg-12 col-md-12">
                    <strong>{ userRole }</strong>
                </div>
              </div>
              <div className="row pl-4 mt-2">
                <div className="col-lg-12 col-md-12">
                    <span>Email ID/UserName</span>
                </div>
                <div className="col-lg-12 col-md-12">
                    <strong>{ accountInfo?.email }</strong>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 rightSection font14">
                <div className="row headerSection pr-3 pl-3">
                    <div className="col-lg-12 col-md-12 textBorder">
                        <strong className="headerText">Contact Information</strong>
                    </div>
                </div>
                <form name="contact-info-form">
                    <div>
                        <div className="row pt-2 pl-3 pr-3">
                            <div className="col-sm-6">
                                <div>
                                    Phone
                                    <span className="mandatorySymbol">*</span>
                                </div>
                                <div>
                                    {contactInfo.phone}
                                </div>
                            </div>
                        </div>
                        <div className="row pt-4 pl-3 pr-3">
                            <div className="col-sm-6">
                                <div>
                                    Address Line 1
                                    <span className="mandatorySymbol">*</span>
                                </div>
                                <div>
                            ```     {contactInfo.address1}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div>Address Line 2</div>
                                <div>
                                    {contactInfo.address2}
                                </div>
                            </div>
                        </div>
                        <div className="row pt-3 pl-3 pr-3">
                            <div className="col-sm-6">
                                <div>
                                    City
                                    <span className="mandatorySymbol">*</span>
                                </div>
                                <div>
                                    {contactInfo.city}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div>
                                    State
                                    <span className="mandatorySymbol">*</span>
                                </div>
                                <div>
                                    {contactInfo.state}
                                </div>
                            </div>
                        </div>
                        <div className="row pt-3 pl-3 pr-3">
                            <div className="col-sm-6">
                                <div>
                                    Country
                                    <span className="mandatorySymbol">*</span>
                                </div>
                                <div>
                                    {contactInfo.country}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div>
                                    ZIP Code
                                    <span className="mandatorySymbol">*</span>
                                </div>
                                <div>
                                    {contactInfo.pincode}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
          </div>)}
        </div>
      </div>
      </div>
    )
}