<?php
if($_POST) {
	$path = $_SERVER['DOCUMENT_ROOT'] . '/review.json';
	$content = file_get_contents($path);
	$msgArray = json_decode($content);
	$lastIndex = array_key_last($msgArray->reviews);
	$msgArray->reviews[$lastIndex + 1] = clone $msgArray->reviews[$lastIndex];
	$msgArray->reviews[$lastIndex + 1]->user = $_POST['user'];
	$msgArray->reviews[$lastIndex + 1]->text = $_POST['text'];
	$msgArray->reviews[$lastIndex + 1]->date = date('Y-m-d');
	$content = json_encode($msgArray);
	file_put_contents($path, $content);
	echo $content;
} else {
	echo 'Error: No data received!';
}