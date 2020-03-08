/**
 * Lab 2 WEDB6201 - Client Side Scripting
 * Author: Luis Grijalva 100719475
 * Date: 3/8/2020
 */


class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}

//Step 2g
class User
{
    //Define the constructor and its properties
    constructor(firstName = "",lastName="",userName = "", email = "", password="")
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}




"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
let name;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

       let pageName = name.substring(1, name.length - 5);

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#"+pageName).addClass("active");
    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";
        /* $("button").click(()=>{
            location.href = "projects.html";
        }); */

        document.title = "WEBD6201 - Home";

        let progressbar = $( "#progressBar" ).progressbar({
            value: 37
          });

        console.log(progressbar);

        $("#projectsButton").click(function(){
            $(this).fadeOut(3000, "linear", ()=>{
                $(this).fadeIn(1000, "linear", ()=>{
                    location.href = "projects.html";
                });
            });
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
            //Step 2a
            e.preventDefault();
            e.stopPropagation();
            //Get text from textbox
            name =$("#contactName").val();
            console.log(name);
            console.log($("#password").val());
            
            //If both textboxes contain something:
            if ($("#password").val() != "" && name!=""){
                //Get the last element of the navbar
                let child = $("#navbarSupportedContent").children().children().last();
                //Clone a navbar element and edit it
                let nameElement = child.clone();
                //Change text to whatever the textbox had
                $(nameElement[0]).text("  "+name+"  ");
                //Change id
                $(nameElement[0]).attr("id","loggedIn");
                //Change class for styling purposes
                $(nameElement[0]).attr("class","navbar-text");
                //Append it before last element of the navbar
                $(nameElement[0]).insertBefore(child);
            }
            else{
                console.log("A username and a password are needed");
                
            }
            

            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();

            

        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";
        function validateInput(selector, condition, errorMessage)
        {

        }
        //Step 2c
        //Create the submit event
        $("#registerForm").submit(function (e) { 
            //Step 2f
            //Prevent default behaviour
            e.preventDefault();
            e.stopPropagation();

            //Reset error message text
            $("#errorMessage").text("");
            $("#errorMessage").hide();
            //Get the values from the textboxes
            let firstName = $("#FirstName").val();
            let lastName = $("#lastName").val();
            let email = $("#emailAddress").val();
            let password = $("#password").val();
            let confirmPassword = $("#confirmPassword").val();

            
            //If empty
            if (firstName != "") {
                //If not empty, check length
                if(firstName.length<2)
                {
                    //Show the error message and append an appropriate message
                    $("#errorMessage").show();
                    $("#errorMessage").append("\nFirst Name cannot be less than 2 characters");
                    $("#errorMessage").append("<br/>");
                }
            }
            else{
                //Show the error message and append an appropriate message
                $("#errorMessage").show();
                $("#errorMessage").append("\nFirst Name cannot be empty\n");
                $("#errorMessage").append("<br/>");
            }
            //If empty
            if (lastName != "") {
                //If not empty, check length
                if(lastName.length<2)
                {
                    //Show the error message and append an appropriate message
                    $("#errorMessage").show();
                    $("#errorMessage").append("\nLast Name cannot be less than 2 characters\n");
                    $("#errorMessage").append("<br/>");
                }
            }
            else{
                //Show the error message and append an appropriate message
                $("#errorMessage").show();
                $("#errorMessage").append("\nLast Name cannot be empty\n");
                $("#errorMessage").append("<br/>");
            }
            
            //Step 2d
            //Check for email string length
            if (email == "" || email.length <8) {
                $("#errorMessage").show();
                $("#errorMessage").append("Email Address cannot be less than 8 characters");
                $("#errorMessage").append("<br/>");
            } 
            //Check if email string contains the @ symbol            
            if (!email.includes("@")) {
                $("#errorMessage").show();
                $("#errorMessage").append("\nEmail address must contain the @ symbol");
                $("#errorMessage").append("<br/>");
            }

            //Step 2e
            //Check if strings are the same
            if (password == confirmPassword) {
                //If they are the same, check length
                if (password.length<6) {
                    $("#errorMessage").show();
                    $("#errorMessage").append("Password cannot be less than 6 characters");
                    $("#errorMessage").append("<br/>");
                }
            }
            else{
                $("#errorMessage").show();
                $("#errorMessage").append("Passwords do not match");
                $("#errorMessage").append("<br/>");
            }

            //Step 2h
            //Create a user object
            let userObject = new User();

            //Populate the properties
            userObject.firstName=firstName;
            userObject.lastName = lastName;
            userObject.email = email;
            userObject.password = password;

            //Display in console
            console.log(userObject);

            //Clear the form
            $("#registerForm")[0].reset();
            $("#errorMessage").hide();
        });
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       //Step 2b
       //Create a div tag, hidden
       let errorMessage  = document.createElement("div");
       //Set the id
       $(errorMessage).attr("id","errorMessage");
       //Change color of text to red
       $(errorMessage).css("color","red");
       //Hide it
       $(errorMessage).hide();
       //Get the element containing the text from the form
       let formText = $("#registerForm").children()[0];
       //Append if after
       $(errorMessage).insertAfter(formText);
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

