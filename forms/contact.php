<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

try {

    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $phone   = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // SMTP Setup
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'sanjayskpy7@gmail.com';
    $mail->Password   = 'fruj dlse vjrv zbts';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // FIXED SENDER
    $mail->setFrom($mail->Username, 'Website Contact');
    $mail->addReplyTo($email, $name);

    // Receiver Email
    $mail->addAddress("xenotrixtech@gmail.com");

    $mail->isHTML(true);
    $mail->Subject = "New Contact Form - $subject";

    $mail->Body = "
        <h3>New Message from Website</h3>
        <p><b>Name:</b> $name</p>
        <p><b>Email:</b> $email</p>
        <p><b>Phone:</b> $phone</p>
        <p><b>Subject:</b> $subject</p>
        <p><b>Message:</b><br>$message</p>
    ";

    $mail->send();
    echo "success";

} catch (Exception $e) {
    echo "error: " . $mail->ErrorInfo;
}
?>
