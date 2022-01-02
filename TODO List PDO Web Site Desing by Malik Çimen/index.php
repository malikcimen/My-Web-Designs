<?php include 'header.php'; ?>


<div class="container py-4">
	<div class="row">
		<div class="col-md-10 offset-md-1">
			<div class="row">
				<div class="col-md-12">
					<?php if (isset($_POST['sendform'])) {
						if (@!$_POST['subject'] || @!$_POST['nameandsurname'] || @!$_POST['companyname'] || @!$_POST['phone'] || @!$_POST['email'] || @!$_POST['message']) {
							?>
							<script type="text/javascript">
								swal({
									title: "Warning!",
									text: "Do not leave blank space !",
									icon: "warning",
								}).then((value) => {
									window.location.href = "index.php";
								});
							</script>
							<?php
						}else {
							$subject = security($_POST['subject']);
							$nameandsurname = security($_POST['nameandsurname']);
							$companyname = security($_POST['companyname']);
							$phone = security($_POST['phone']);
							$email = security($_POST['email']);
							$message = security($_POST['message']);
							$data = [
								"contact_subject"=>$subject,
								"contact_nameandsurname"=>$nameandsurname,
								"contact_companyname"=>$companyname,
								"contact_phone"=>$phone,
								"contact_email"=>$email,
								"contact_message"=>$message
							];
							$insert = $dbh->insert("contact",$data);
							if ($insert) {
								?>
								<script type="text/javascript">
									swal({
										title: "Success !",
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
					<form method="post" action="">
						<div class="form-group">
							<label>Subject</label>
							<input type="text" class="form-control" placeholder="Subject" required name="subject">
						</div>
						<div class="form-group">
							<label>First name and Last Name</label>
							<input type="text" class="form-control" placeholder="First name and Last Name" required name="nameandsurname">
						</div>
						<div class="form-group">
							<label>Company Name</label>
							<input type="text" class="form-control" placeholder="Company Name" required name="companyname">
						</div>
						<div class="form-group">
							<label>Phone</label>
							<input type="text" class="form-control" placeholder="Phone" required name="phone">
						</div>
						<div class="form-group">
							<label>Email Address</label>
							<input type="text" class="form-control" placeholder="Email Address" required name="email">
						</div>
						<div class="form-group">
							<label>Message</label>
							<textarea class="form-control" name="message" placeholder="Message" style="height: 90px"></textarea>
						</div>
						<div class="form-group">
							<input type="submit" class="btn btn-outline-success" value="Send" name="sendform">
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<?php include 'footer.php'; ?>