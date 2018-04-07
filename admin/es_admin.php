<?php
	require_once ("default-header.php");
?>


<!-- Admin View/Edit Page -->
<section id="Section-Admin" class="container-fluid">
	<div id="Admin">
		<div class="card shadow-nohover" style="width: 95%;">
			<div class="card-block">
				<div class="row">
					<div class="col">
						<h4 class="card-title"><span id="title">Alterar Perfil</span></h4>
					</div>
				</div>
				<div class="card-text">
					<form method="post" id="Admin-Form">
						<div class="form-group alert alert-danger collapse" id="Admin-Alerts"><ul></ul></div>
						<div class="form-group row">
							<label for="example-text-input" class="col-2 col-form-label">Nome completo</label>
							<div class="col-10">
								<input class="form-control" type="text" value="" id="Admin-fldFullName" maxlength=30>
							</div>
						</div>
						<div class="form-group row">
							<label for="example-text-input" class="col-2 col-form-label">Nome de usuário</label>
							<div class="col-10">
								<input class="form-control" type="text" value="" id="Admin-fldName" maxlength=20>
							</div>
						</div>
						<div class="form-group row">
							<label for="example-text-input" class="col-2 col-form-label">E-mail</label>
							<div class="col-10">
								<input class="form-control" type="email" value="" id="Admin-fldEmail" maxlength=60>
							</div>
						</div>
						<div class="form-group row">
							<label for="example-text-input" class="col-2 col-form-label">Password</label>
							<div class="col-10">
								<input class="form-control" type="password" value="" id="Admin-fldPassword" maxlength=20>
							</div>
						</div>
					</form>
				</div>
				<div id="Admin-Commands" class="row command_header">
					<div class="col">
						<a id="Admin-cmdClose" href="javascript: $('#Admin-cmdClose').trigger('click');" class="btn btn-primary table-button ">Fechar</a>
						<a id="Admin-cmdSave" href="javascript: $('#Admin-cmdSave').trigger('click');" class="btn btn-primary table-button ">Salvar</a>
					</div>
				</div>
			</div>
		</div>										
	</div>						
</section>
							
<?php
	require_once ("default-footer.php");
?>