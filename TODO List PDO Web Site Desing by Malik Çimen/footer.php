<head>
    <style type="text/css">
        tr th {
            color: white;
        }
    </style>
</head>
<div class="container">
    <?php if (@!$_GET['id']) {
        ?>
        <div class="mt-5 d-none d-md-block">
            <div class="table-responsive">
                <?php if (isset($_POST['delete'])) {
                    if (@!$_POST['id']) {
                        header("Location:index");
                        die();
                    }else {
                        $dbh->where("contact_id",security($_POST['id']));
                        $delete = $dbh->delete("contact");
                        if ($delete) {
                            ?>
                            <script type="text/javascript">
                                swal({
                                    title: "Success!",
                                    text: "Success !",
                                    icon: "success",
                                }).then((value) => {
                                    window.location.href = "index.php";
                                });
                            </script>
                            <?php
                        }else {
                            ?>
                            <script type="text/javascript">
                                swal({
                                    title: "Warning!",
                                    text: "System error has occurred !",
                                    icon: "warning",
                                }).then((value) => {
                                    window.location.href = "index.php";
                                });
                            </script>
                            <?php
                        }
                    }
                } ?>
                <table class="table table-centered table-hover mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Subject</th>
                            <th scope="col">Name And Surname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        <?php 
                        $contact = $dbh->get("contact");
                        foreach ($contact as $row) { ?>

                            <tr>
                                <td>
                                    <?php echo $row['contact_subject'] ?>
                                </td>
                                <td>
                                    <?php echo $row['contact_nameandsurname'] ?>
                                </td>
                                <td>
                                    <?php echo $row['contact_email'] ?>
                                </td>
                                <td>
                                    <a class="btn btn-success" href="update.php?id=<?php echo $row['contact_id'] ?>">Update</a>
                                </td>
                                <td>
                                    <form action="" method="post">
                                        <input type="hidden" value="<?php echo $row['contact_id'] ?>" name="id">
                                        <input type="submit" class="btn btn-danger" value="Delete" name="delete">
                                    </form>
                                </td>
                            </tr>

                        <?php } ?>

                    </tbody>
                </table>
            </div>
        </div>
        <?php
    } ?>
</div>
</div>
<footer class="footer d-none d-lg-block">
    <div class="container">
        <div class="row pt-md">
            <div class="col-lg-4 mb-5 mb-lg-0 pr-4">
                <a href="#" class="navbar-brand mb-3 text-white"><img src="https://www.mentalmimar.com/img/2c1c79bca485235d6c5772cd19ab0acac78eb653.png" height="40" alt="Dijital Oyun, Epin Satışı ve İkinci El Oyun Pazarı | GamePazarı"></a>
                <div class="text-sm text-muted"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>
                <div class="mt-3 mb-3"><a href="#">Lorem İpsum</div><br>
                </div>
                <div class="col-lg-2 col-6 col-sm-3 ml-lg-auto mb-5 mb-lg-0">
                    <h6 class="heading mb-3">Lorem İpsum</h6>
                    <ul class="list-unstyled">
                        <li><a href="#">Lorem İpsum</a></li>
                        <li><a href="#">Lorem İpsum</a></li>
                        <li><a href="#">Lorem İpsum</a></li>
                        <li><a href="#">Lorem İpsum</a></li>
                        <li><a href="#">Lorem İpsum</a></li>
                        <li><a href="#">Lorem İpsum</a></li>
                    </ul>
                </div>
                <div class="col-lg-5 col-sm-3 mb-5 mb-lg-0 d-none d-md-block">
                    <div class="d-flex align-items-center justify-content-between mt-3">
                        <div class="d-flex align-items-center">
                            <div class="btn-icon"><i class="fas fa-phone"></i></div>
                            <div class="ml-3">
                                <div class="small text-muted">Telefon Numarası</div>
                                <div class="text-2x text-white">Lorem İpsum</div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center ml-3">
                            <div class="btn-icon"><i class="fas fa-envelope-open"></i></div>
                            <div class="ml-3">
                                <div class="small text-muted">Lorem İpsum</div>
                                <div class="text-2x text-white"><a href="#" class="__cf_email__">Lorem İpsum</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mt-4">
                        <div class="ml-4">
                            <a href="https://www.facebook.com/gamepazaricom" target="_blank" class="btn-facebook btn btn-sm btn-rounded">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com/gamepazari/" target="_blank" class="btn-twitter btn btn-sm btn-rounded mx-2">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/gamepazaricom/" target="_blank" class="btn-instagram btn btn-sm btn-rounded">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="navbar-search-overlay"></div>
    <!-- .modal -->
    <div id="m" class="modal" data-backdrop="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
        </div>
    </div>
    <!-- / .modal -->
    <!-- .mobile menu -->
    <div class="aside-sm aside" id="mobile-menu">
        <div class="modal-dialog bg-dark m-0 w-lg h-100 hv-100">
            <div class="scrollable py-3 w-100">
            <div class="nav-border b-primary" data-nav="">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a href="index.php" class="nav-link">
                            <span class="nav-text text-md">Anasayfa</span>
                        </a>
                    </li>
                    <?php  ?>

                </ul>
            </div>
        </div>
    </div>
</div>
<!-- / .mobile menu -->
<!-- right -->
<div class="modal" id="md" data-backdrop="true" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
    </div>
</div>
<!-- right -->
<div class="modal" id="sm" data-backdrop="true" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
    </div>
</div>

<script src="assets/js/theme.js"></script>
</body>

</html>