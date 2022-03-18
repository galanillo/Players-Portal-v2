<?php

    include 'basedatos.php';

    if(!$myconn){
        echo "Error en la conexión a BBDD<br/>";
    }else{

        $nombre= $_POST["nick"];
        $contra= $_POST["password"];


        $query="SELECT nick, email FROM usuarios WHERE nick = '".$nombre."' and passwd ='".$contra."';";    
        $query=mysqli_query($myconn,$query);
        
        $mostrar=mysqli_fetch_array($query);
        $user=$mostrar['nick'];
        
        $nr= mysqli_num_rows($query);


        if($nr == 1){
            session_start();
            $_SESSION['idusuario']="$user";
            $uri = 'http://';
            $uri .= $_SERVER['HTTP_HOST'];
            header('Location: '.$uri.'/Players-Portal-v2/index.html');
            exit;
        } else if($nr == 0){
            $uri = 'http://';
            $uri .= $_SERVER['HTTP_HOST'];
	       header('Location: '.$uri.'/Players-Portal-v2/login2.php');
	       exit;
        }

        mysqli_close($myconn);

    }
?>


