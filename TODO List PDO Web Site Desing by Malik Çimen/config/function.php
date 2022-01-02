<?php  
function security($gelenmetin) {
	$bul = array("sql","SQL","select","SELECT","update","UPDATE","delete","DELETE","union","UNİON","query","QUERY","prepare","PREPARE","from","FROM","alert","ALERT","script","SCRİPT","Script","<script>","<Script>");
	$degis = array("","","","","","","","","","","","","","","","","","","","","","","");
	$degisen = str_replace($bul, $degis, $gelenmetin);

	$search = array(
		'@<script&#91;^>]*?>.*?</script>@si',
		'@<&#91;\/\!&#93;*?&#91;^<>]*?>@si',
		'@<style&#91;^>]*?>.*?</style>@siU',
		'@<!&#91;\s\S&#93;*?--&#91; \t\n\r&#93;*>@');

	$output = preg_replace($search, '', $degisen);

	return $output;

}

function siteurl(){
	$url = $_SERVER['SERVER_NAME'];
	$currenturl = $_SERVER['REQUEST_URI'];

	$clean_server = str_replace('',$url, $currenturl);
	$clean_server = explode('/', $clean_server);
	if (isset($_SERVER['HTTPS'])) {
		return "https://".$url."/".$clean_server[1];
	}else {
		return "http://".$url."/".$clean_server[1];
	}
}
?>