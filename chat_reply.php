<?php
$templates = [
  'hello' => ['text' => 'Hi there! How can I help you today?'],
  'hi' => ['text' => 'Hello! What can I assist you with?', 'image' => 'https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg'],
  'price' => ['text' => 'Here is our pricing brochure:', 'image' => 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg'],
  'contact' => ['text' => 'You can contact us at +91-9426999619 or email us at info@techvariables.in'],
  'thanks' => ['text' => 'You\'re welcome! Let me know if you have any more questions.'],
  'bye' => ['text' => 'Goodbye! Have a great day!']
  
];

$userInput = strtolower(trim($_POST['message'] ?? ''));
$response = ['text' => "Sorry, I didn't understand that."];

// Check for exact keyword match
$matched = false;
foreach ($templates as $keyword => $data) {
  if (strpos($userInput, $keyword) !== false) {
    $response = $data;
    $matched = true;
    break;
}
}

// If no exact match, provide suggestions
if (!$matched) {
  $suggestions = [];
  foreach ($templates as $keyword => $data) {
    if (levenshtein($userInput, $keyword) <= 4 || strpos($keyword, $userInput) !== false) {
      $suggestions[] = $keyword;
    }
  }
  if ($suggestions) {
    $response['suggestions'] = $suggestions;
  }
}

header('Content-Type: application/json');
echo json_encode($response);
