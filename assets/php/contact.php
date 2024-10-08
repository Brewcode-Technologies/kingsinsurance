<?php
 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

        // Check that data was sent to the mailer.
        if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the required fields and try again.";
            exit;
        }

     
        $recipient = "info@yourmail.com";

        $subject = "New contact from $name";

        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        
        if (isset($_POST["phone"])) {
            $phone = trim($_POST["phone"]);
            $email_content .= "Phone: $phone\n";
        }
        
        if (isset($_POST["subject"])) {
            $subject = trim($_POST["subject"]);
            $email_content .= "Subject: $subject\n";
        }
        
        if (isset($_POST["insurance_type"])) {
            $insurance_type = trim($_POST["insurance_type"]);
            $email_content .= "Insurance Type: $insurance_type\n";
        }
        if (isset($_POST["balance_limits"])) {
            $balance_limits = trim($_POST["balance_limits"]);
            $email_content .= "Limits Of Balance: $balance_limits\n";
        }
        if (isset($_POST["message"])) {
            $message = trim($_POST["message"]);
            $email_content .= "Message:\n$message\n";
        }

        $email_headers = "From: $name <$email>";

        if (mail($recipient, $subject, $email_content, $email_headers)) {
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
?>
