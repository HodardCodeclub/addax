//this is the function to notify
function notifier(status, text, holder) {
    /*
     *0=failure
     *1=success
     *2=pending
     * */
    if (status == 0) {
        holder.innerHTML = "<span class='alert alert-danger'>" + text + "</span>";
    } else if (status == 1) {
        holder.innerHTML = "<span class='alert alert-success'>" + text + "</span>";
    } else {
        holder.innerHTML = "<span class='alert alert-info'>" + text + "<i class='fa fa-spinner fa-pulse'></i></span>";
    }
}


//adding attribute form
function addAttribute(obj) {
    var attributeNumber = obj.value;
    //display input fields
    var container = document.getElementById("attributes");
    //show the attribute division
    container.style.visibility = "visible";
    // Clear previous contents of the container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i = 0; i < attributeNumber; i++) {
        //CREATING THE ELEMENTS
        //name of the attribute
        var name = document.createElement("input");
        name.type = "text";
        name.id = "attr_name" + i;
        name.name = "attr_name" + i;
        name.className = "form-control";
        name.placeholder = "Attribute name";

        //type of the attribute        
        var attrType = document.createElement("select");
        attrType.id = "attr_type" + i;
        attrType.name = "attr_type" + i;
        attrType.onchange = "loadComboBox(this)";
        attrType.innerHTML = "<option value=''>-- Select type --</option>" +
            "<option value='text'>Text</option>" +
            "<option value='numeric'>Numeric</option>" +
            "<option value='date'>Date</option>" +
            "<option value='file'>File</option>" +
            "<option value='long text'>Long text</option>" +
            "<option value='select'>Select from</option>";
        attrType.className = "form-control";
        attrType.style = "margin-left:15px;margin-bottom:2px";
        attrType.setAttribute("onchange", "loadComboBox(this)");

        //creating the label for the nullable selection
        var nullLabel = document.createElement("label");
        nullLabel.innerHTML = "Nullable";
        nullLabel.className = "control-label";
        nullLabel.style = "margin-left:15px;margin-bottom:2px";

        //creating radio buttons
        var radioLabelTrue = document.createElement("label");
        radioLabelTrue.className = "checkbox-inline";
        radioLabelTrue.innerHTML = "<input type='radio' name='attr_nullable" + i + "' value='true'>True";

        var radioLabelFalse = document.createElement("label");
        radioLabelFalse.className = "checkbox-inline";
        radioLabelFalse.innerHTML = "<input type='radio' name='attr_nullable" + i + "' value='false'>False";

        //displaying the elements
        container.appendChild(name);
        container.appendChild(attrType);
        container.appendChild(nullLabel);
        container.appendChild(radioLabelTrue);
        container.appendChild(radioLabelFalse);
        //append line break
        container.appendChild(document.createElement("br"));
    }
}


//load combo box
function loadComboBox(obj) {
    var xmlhttp = new XMLHttpRequest;
    var response = null;
    if (obj.value == "select") {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                response = xmlhttp.responseText;
                obj.innerHTML = response;
            }
        };
        xmlhttp.open("GET", "../includes/interface.php?action=combo_tables", true);
        xmlhttp.send();
    } else if (obj.value != "text" &&
        obj.value != "numeric" &&
        obj.value != "date" &&
        obj.value != "file" &&
        obj.value != "long text" &&
        obj.value != "select" &&
        obj.value != "none") {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                response = xmlhttp.responseText;
                obj.innerHTML = response;
            }
        };
        xmlhttp.open("GET", "../includes/interface.php?action=combo_table_columns&table_name=" + obj.value, true);
        xmlhttp.send();
    } else if (obj.value == "none") {
        obj.innerHTML = "<option value=''>-- Select type --</option>" +
            "<option value='text'>Text</option>" +
            "<option value='numeric'>Numeric</option>" +
            "<option value='date'>Date</option>" +
            "<option value='file'>File</option>" +
            "<option value='long text'>Long text</option>" +
            "<option value='select'>Select from</option>";
    }
}
//feed combo box
function feedComboBox() {

}

//loading the interface
function loader() {

}
//feed modal
function feedModal() {
    var instance = document.getElementById("instance_value").value;
    var field = document.getElementById("field_value").value;
    var trigger = document.getElementById("btn_trigger");
    document.getElementById("deleteModal_body").innerHTML = "Loading...";
    if (instance != null && field != null) {
        var xmlhttp = new XMLHttpRequest;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                var response = xmlhttp.responseText;
                document.getElementById("deleteModal_body").innerHTML = response;
            }
        };
        xmlhttp.open("GET", "../includes/interface.php?action=feed_modal&instance=" + instance + "&field=" + field, true);
        xmlhttp.send();
    } else {
        //disable button 
        trigger.disabled(true);
    }

}