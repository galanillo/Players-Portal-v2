<?php       

    include 'basedatos.php';

    if(!$myconn){
        echo "Error en la conexión a BBDD<br>"; 
    }else{

        $nombre= $_POST["nick_1"];
        $contra= $_POST["password_1"];
        $conf = $_POST["passconf_1"];
        
        echo $nombre;

        $query="UPDATE usuarios SET passwd = '".$contra."' WHERE email = '".$nombre."'"; //revisar email ese
        $query=mysqli_query($myconn,$query);

        echo $result['pass'];
    
        if(!$query){
            echo 'error';
        }else{
            //if($contra == $conf){
                $uri = 'http://';
                $uri .= $_SERVER['HTTP_HOST'];
                header('Location: '.$uri.'/Players-Portal-v2/login.php');
                exit;
        
        }
        mysqli_close($myconn);

}
?>
