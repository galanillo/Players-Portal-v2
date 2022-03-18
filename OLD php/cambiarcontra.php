<!DOCTYPE HTML>
<html>
    <head>
        <title>Cambiar contraseña</title>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="icon" href="images/logo.ico" type="image/png" />
    </head>

    <body>
        <form class="box" action="conexcambiarcontra.php" method="POST">
            <br><br><br><br><br><br>
            <h2>Cambiar contraseña</h2>
            
             <form class="box" action="index.php" method="post">
           <input type="email" name="email" placeholder="Email">
            <input type="password" name="password_1" placeholder="Nueva contraseña">
            <input type="password" name="passconf_1" placeholder="Confirmar contraseña">
    
            <input type="submit" value="Cambiar contraseña" name="btnRegistrar">   
                 <br><br/>
                <p> Si no estás registrado, <a href= "signup.php"> Regístrate</a></p>
                <p>Si ya tienes una cuenta, <a href= "login.php"> Logueate</a></p>
            </form>
            
        </form>
    </body>
</html>