 function ValidateEmail(inputText)/ {
 var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 if(inputText.value.match(mailformat))
 {
 document.form1.text1.focus();
 return true;
 }
 else
 {
 alert("You have entered an invalid email address!");
 document.form1.text1.focus();
 return false;
 }
 }


 function validateUser()
// {
//     var x=document.forms["myForm"]["email"].value;
//     var atpos=x.indexOf("@");
//     var dotpos=x.lastIndexOf(".");
//     if (atpos<2 || dotpos<atpos+2 || dotpos+2>=x.length)
//     {
//         alert("Not a valid e-mail address");
//         return false;
//     }

//     {
//         alert("Valid Input");
//     }

//     return true;
// }

<!DOCTYPE html>
<html>
<head></head>
<script>
function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}