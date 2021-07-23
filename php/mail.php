<?php
//message

$errors = [];

if (!empty($_POST)){
  $mail = $_POST['mail'];
  $objet = $_POST['objet'];
  $message = $_POST['messsage'];

  if (empty($mail)) {
    $errors[] = "l'email est vide";
  } else if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "l'email est invalide";
  }

  if (empty($objet)) {
    $errors[] = "L'objet est vide";
  }

  if (empty($message)) {
    $errors[] = 'Le message est vide';
  }

  if (empty($errors)) {
      $toEmail = 'contact@masourisdordinateur.com';
      $emailSubject = $objet;
      $headers = ['From' => $mail, 'Reply-To' => $mail, 'Content-type' => 'text/html'; 'charset'='utf-8'];

      $bodyParagraphs = ["Email: {$mail}", "Objet: {$objet}" "Message:", $message];
      $body = join(PHP_EOL, $bodyParagraphs);

      if (mail($toEmail, $emailSubject, $body, $headers)) {
          echo '<p>Message envoyé!</p>';
      } else {
          $errorMessage = "Cela n'a pas fonctionné!";
      }
  } else {
      $allErrors = join('<br/>', $errors);
      $errorMessage = "<p style='color: red;'>{$allErrors}</p>";
  }
}
