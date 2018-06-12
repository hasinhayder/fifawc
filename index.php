<?php
require_once "cc.php";
$cc      = [];
$ccarray = json_decode( $countries, true );
foreach ( $ccarray as $c => $v ) {
    $cc[ $v['group'] ][ $c ] = $v['code'];
}
?>
<html>
<head>
    <meta charset="utf-8">
    <title>Fifa Football World Cup 2018 Fixture</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
<div class="container">
    <div class="row">
        <?php
        foreach ( $cc as $name=>$group ) {
            ?>
            <div class="col-md-3">
                <div class="teams">
                    <h1 class="teams-title">Group <?php echo strtoupper($name); ?></h1>
                    <ul>
                        <?php
                        foreach ( $group as $country=>$code ) {
                            ?>
                            <li class="<?php echo $code; ?>">
                                <img src="http://www.countryflags.io/<?php echo $code; ?>/flat/32.png" alt="<?php echo $country ?>">
                                <span><?php echo $country; ?></span>
                            </li>
                            <?php
                        }
                        ?>
                    </ul>
                </div>
            </div>

            <?php
        }
        ?>


    </div>
</div>
<script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
        crossorigin="anonymous"></script>

<script type="text/javascript">

</script>
</body>
</html>


















