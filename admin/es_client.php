<?php
	require_once ("default-header.php");
?>

					<!-- Admin View/Edit Page -->
					<section id="Section-Admin" class="container-fluid">
						<div id="Admin" class="collapse">
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
											<a id="Admin-cmdClose" href="javascript: $('#Admin-cmdClose').trigger('click');" class="btn btn-secondary table-button ">Fechar</a>
											<a id="Admin-cmdSave" data-id="<?php echo $_SESSION["USER_ID"]; ?>" href="javascript: $('#Admin-cmdSave').trigger('click');" class="btn btn-primary table-button ">Salvar</a>
										</div>
									</div>
								</div>
							</div>										
						</div>						
					</section>
				
					<!-- Prospect Grid View Page -->
					<section id="Section-Prospect" class="container-fluid">
					
						<!-- Record Delete -->
						<div id="Prospect-Delete" class="modal fade" data-animation="false">
							<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title">Confirma?</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<p>Os dados selecionados serão apagadas definitivamente.</p>
									</div>
									<div class="modal-footer">
										<button id="Prospect-Delete-Confirmation" type="button" class="btn btn-primary" data-id="" data-eventSource="">Continuar</button>
										<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
									</div>
								</div>
							</div>
						</div>					

						<!-- Record Edit -->
						<div id="Prospect-Edit">
							<div class="card shadow-nohover" style="width: 95%;">
								<div class="card-block">
									<div class="row">
										<div class="col">
											<h4 class="card-title"><span id="title">Prospecto</span></h4>
										</div>
									</div>
									<div class="card-text" id="Prospect-Edit-DataView">
										<form method="post" id="Prospect-Form">

											<!-- Nav tabs -->
											<ul class="nav nav-tabs" role="tablist">
											  <li class="nav-item">
											    <a class="nav-link active" data-toggle="tab" href="#Prospect-Tab1" role="tab">Dados básicos</a>
											  </li>
											  <li class="nav-item">
											    <a class="nav-link" data-toggle="tab" href="#Prospect-Tab2" role="tab">Formacão Acadêmica</a>
											  </li>
											  <li class="nav-item">
											    <a class="nav-link" data-toggle="tab" href="#Prospect-Tab3" role="tab">Perfil Profissional</a>
											  </li>
											  <li class="nav-item">
											    <a class="nav-link" data-toggle="tab" href="#Prospect-Tab4" role="tab">Perfil Estudante</a>
											  </li>
											  <li class="nav-item">
											    <a class="nav-link" data-toggle="tab" href="#Prospect-Tab5" role="tab">Perfil Empreendedor</a>
											  </li>
											  <li class="nav-item">
											    <a class="nav-link" data-toggle="tab" href="#Prospect-Tab6" role="tab">Perfil Aposentado</a>
											  </li>
											  <li class="nav-item">
											    <a class="nav-link" data-toggle="tab" href="#Prospect-Tab7" role="tab">Rendimentos Próprios</a>
											  </li>
											  <li class="nav-item">
											    <a class="nav-link" data-toggle="tab" href="#Prospect-Tab8" role="tab">Pessoa Notória</a>
											  </li>
											</ul>

											<!-- Tab panes -->
											<div class="tab-content" id="Prospect-View-Tabs">

												<!-- Pane: Dados Básicos do Prospecto -->
												<div class="tab-pane active" id="Prospect-Tab1">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Nome completo</label>
															<input type="text" class="form-control uppercase" id="fldName">		
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Email</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
																<input type="email" class="form-control form-control-danger lowercase" id="fldEmail">
															</div>
														</div>	
													</div>
													<div class="row">
														<div class="col-6">
															<label for="recipient-name" class="control-label">Telefone fixo</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-phone" aria-hidden="true"></i></span>
																<input type="text" class="form-control" id="fldLandLine">
															</div>
														</div>
														<div class="col-6">
															<label for="recipient-name" class="control-label">Telefone m�vel</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-mobile" aria-hidden="true"></i></span>
																<input type="text" class="form-control" id="fldMobilePhone">							
															</div>
														</div>	
													</div>
													<div class="row">
														<div class="col-6">
															<label for="recipient-name" class="control-label">Tem nacionalidade portuguesa?</label>
															<div class="input-group">
																<label class="custom-control custom-radio">
																	<input name="fldIsPortuguese" type="radio" class="custom-control-input" value="1">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Sim</span>
																</label>
																<label class="custom-control custom-radio">
																	<input name="fldIsPortuguese" type="radio" class="custom-control-input" value="0">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Não</span>
																</label>
															</div>														
														</div>
														<div class="col-6">
															<label for="recipient-name" class="control-label">Tem parentes portugueses?</label>
															<div class="input-group">
																<div class="form-check form-check-inline">
																  <label class="form-check-label">
																    <input class="form-check-input" type="checkbox" name="fldBonds" value="1"> Pai/Mãe
																  </label>
																</div>
																<div class="form-check form-check-inline">
																  <label class="form-check-label">
																    <input class="form-check-input" type="checkbox" name="fldBonds" value="2"> Cônjuge
																  </label>
																</div>
																<div class="form-check form-check-inline">
																  <label class="form-check-label">
																    <input class="form-check-input" type="checkbox" name="fldBonds" value="4"> Filhos
																  </label>
																</div>
																<div class="form-check form-check-inline">
																  <label class="form-check-label">
																    <input class="form-check-input" type="checkbox" name="fldBonds" value="8"> Avós
																  </label>
																</div>
																<div class="form-check form-check-inline">
																  <label class="form-check-label">
																    <input class="form-check-input" type="checkbox" name="fldBonds" value="16"> Bisavós
																  </label>
																</div>
															</div>
														</div>	
													</div>
												</div>

												<!-- Pane: Formação Acadêmica do Prospecto -->
												<div class="tab-pane" id="Prospect-Tab2">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Nível de escolaridade</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-graduation-cap" aria-hidden="true"></i></span>
																<select class="form-control" id="fldScholarship">
																	<option value="1">1 - Médio completo</option>
																	<option value="2">2 - Superior incompleto</option>
																	<option value="3" selected>3 - Superior completo</option>
																	<option value="4">4 - Pós-graduação incompleto</option>
																	<option value="5">5 - Pós-graduação completo</option>
																</select>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Formação acadêmica</label>
															<input type="text" class="form-control" id="fldGraduation">		
														</div>															
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Diploma emitido por</label>
															<div class="input-group">
																<select class="form-control" id="fldGradLocation">
																	<option value="1" selected>1 - Brasil</option>
																	<option value="2">2 - Portugal</option>
																	<option value="3">3 - Outro país</option>
																</select>
															</div>		
														</div>														
													</div>
												</div>
												
												<!-- Pane: Perfil Profissional do Prospecto -->
												<div class="tab-pane" id="Prospect-Tab3">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Qual é profissão pretende exercer?</label>
															<input type="text" class="form-control form-control-danger" id="fldProfession">		
														</div>															
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Página do Linkedin</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-linkedin-square" aria-hidden="true"></i></span>
																<input type="text" class="form-control form-control-danger" id="fldLinkedin">		
															</div>												
														</div>															
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Observações</label>
															<textarea id="fldObsTab3" class="form-control" rows="8"></textarea>
														</div>
													</div>
												</div>
												
												<!-- Pane: Perfil Estudante do Prospecto -->
												<div class="tab-pane" id="Prospect-Tab4">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">O que pretende cursar?</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-bullseye" aria-hidden="true"></i></span>
																<input type="text" class="form-control" id="fldCourse">		
															</div>											
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Fez ENEM?</label>
															<div class="input-group">
																<label class="custom-control custom-radio">
																	<input name="fldENEM" type="radio" class="custom-control-input" value="1">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Sim</span>
																</label>
																<label class="custom-control custom-radio">
																	<input name="fldENEM" type="radio" class="custom-control-input" value="0">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Não</span>
																</label>
															</div>														
														</div>															
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Observações</label>
															<textarea id="fldObsTab4" class="form-control" rows="8"></textarea>
														</div>
													</div>
												</div>												
												
												<!-- Pane: Dados de Empreendedor do Prospecto -->
												<div class="tab-pane" id="Prospect-Tab5">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Em qual segmento/ramo de atividade pretende investir?</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-briefcase" aria-hidden="true"></i></span>
																<input type="text" class="form-control" id="fldMarketSeg">		
															</div>															
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Já esteve em Portugal?</label>
															<div class="input-group">
																<label class="custom-control custom-radio">
																	<input name="fldPrevVisit" type="radio" class="custom-control-input" value="1">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Sim</span>
																</label>
																<label class="custom-control custom-radio">
																	<input name="fldPrevVisit" type="radio" class="custom-control-input" value="0">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Não</span>
																</label>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Pretende atuar em qual região?</label>
															<div class="input-group">
																<select class="form-control" id="fldLocationToInv">
																	<option value="">&nbsp;</option>
																	<option value="0">Indefinido</option>
																	<option value="99">Em todo o país</option>
																	<option value="1">1 - Aveiro</option>
																	<option value="2">2 - Beja</option>
																	<option value="3">3 - Braga</option>
																	<option value="4">4 - Bragança</option>
																	<option value="5">5 - Castelo Branco</option>
																	<option value="6">6 - Coimbra</option>
																	<option value="7">7 - Évora</option>
																	<option value="8">8 - Faro</option>
																	<option value="9">9 - Guarda</option>
																	<option value="10">10 - Leiria</option>
																	<option value="11">11 - Lisboa</option>
																	<option value="12">12 - Portalegre</option>
																	<option value="13">13 - Porto</option>
																	<option value="14">14 - Santarém</option>
																	<option value="15">15 - Setúbal</option>
																	<option value="16">16 - Viana do Castelo</option>
																	<option value="17">17 - Vila Real</option>
																	<option value="18">18 - Viseu</option>
																</select>
															</div>	
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Quanto investirá inicialmente?</label>
															<div class="input-group">
																<span class="input-group-addon"><i class="fa fa-eur" aria-hidden="true"></i></span>
																<input type="text" class="form-control money-field" id="fldInvest" maxlength="12" size="13">		
															</div>
														</div>
													</div>		
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Plano de negócios</label>
															<textarea id="fldObs5" class="form-control" rows="8"></textarea>
														</div>
													</div>
												</div>
												
												<!-- Pane: Dados de Aposentado do Prospecto -->
												<div class="tab-pane" id="Prospect-Tab6">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Qual é sua situação atual?</label>
															<div class="input-group">
																<select class="form-control" id="fldSitRet">
																	<option value="1" selected>1 - Estou aposentado no Brasil e vivo com este rendimento</option>
																	<option value="2">2 - Estou aposentado, mas também exerço atividade remunerada</option>
																</select>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Renda mensal média</label>
															<div class="input-group">
																<span class="input-group-addon">R$</span>
																<input type="text" class="form-control money-field" id="fldRetWage" maxlength="6" size="7">		
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Em qual região prefere viver?</label>
															<div class="input-group">
																<select class="form-control" id="fldLocationToRet">
																	<option value="">&nbsp;</option>
																	<option value="0">Não tenho preferência</option>
																	<option value="1">1 - Aveiro</option>
																	<option value="2">2 - Beja</option>
																	<option value="3">3 - Braga</option>
																	<option value="4">4 - Bragança</option>
																	<option value="5">5 - Castelo Branco</option>
																	<option value="6">6 - Coimbra</option>
																	<option value="7">7 - Évora</option>
																	<option value="8">8 - Faro</option>
																	<option value="9">9 - Guarda</option>
																	<option value="10">10 - Leiria</option>
																	<option value="11">11 - Lisboa</option>
																	<option value="12">12 - Portalegre</option>
																	<option value="13">13 - Porto</option>
																	<option value="14">14 - Santarém</option>
																	<option value="15">15 - Setúbal</option>
																	<option value="16">16 - Viana do Castelo</option>
																	<option value="17">17 - Vila Real</option>
																	<option value="18">18 - Viseu</option>
																</select>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Com quem viverá em Portugal?</label>
															<div class="input-group">
																<select class="form-control" id="fldRetCompany">
																	<option value="">&nbsp;</option>
																	<option value="1">1 - Sozinho(a)</option>
																	<option value="2">2 - Com meu cônjuge</option>
																	<option value="3">3 - Com meu(s) familiar(es)</option>
																	<option value="4">4 - Com meu cônjuge e familiar(es)</option>
																</select>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Será responsável por menores de 18 anos?</label>
															<div class="input-group">
																<label class="custom-control custom-radio">
																	<input name="fldIsSponsor" type="radio" class="custom-control-input" value="1">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Não</span>
																</label>
																<label class="custom-control custom-radio">
																	<input name="fldIsSponsor" type="radio" class="custom-control-input" value="2">
																	<span class="custom-control-indicator"></span>
																	<span class="custom-control-description">Sim</span>
																</label>
															</div>
														</div>
													</div>													
												</div>
												
												<!-- Pane: Dados de Rendimentos Próprios do Prospecto -->
												<div class="tab-pane" id="Prospect-Tab7">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Observações</label>
															<textarea id="fldObsTab7" class="form-control" rows="8"></textarea>
														</div>
													</div>
												</div>
												
												<!-- Pane: Dados de Pessoa Notória do Prospecto -->
												<div class="tab-pane" id="Prospect-Tab8">
													<div class="row">
														<div class="col">
															<label for="recipient-name" class="control-label">Observações</label>
															<textarea id="fldObsTab8" class="form-control" rows="8"></textarea>
														</div>
													</div>
												</div>
												
											</div>

										</form>
									</div>
									<div id="Prospect-Edit-Commands" class="row command_header">
										<div class="col">
											<a href="javascript: $('#lnkProspects').trigger('click');" class="btn btn-primary table-button ">Voltar</a>
										</div>
									</div>
								</div>
							</div>										
						</div>

						<!-- Data List View -->
						<div id="Prospect-View">
							<div class="card shadow-nohover" style="width: 95%;">
								<div class="card-block">
									<div class="row">
										<div class="col">
											<h4 class="card-title">Prospectos <span id="Prospect-View-Records" class="badge badge-info"></span> </h4>
										</div>
										<div class="col text-right">
											<a href="#" class="btn btn-primary table-button collapse">Novo cadastro...</a>
										</div>
									</div>
									<div class="card-text" id="Prospect-View-DataView">
										<table id="Prospect-View-DataTable" class="table table-bordered table-hover table-sm">
											<thead>
												<tr class="table_header">
													<th style="width: 40px">#</th>
													<th>Nome completo</th>
													<th>E-mail</th>
													<th>Ações</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
										<div id="Prospect-View-Message" class="alert alert-danger" role="alert"></div>
									</div>
									<div class="row">
										<div class="col" id="Prospect-View-Pagination">
											<nav aria-label="Page navigation">
											  <ul class="Prospect-View-Pages">
											  </ul>
											</nav>
										</div>
									</div>
								</div>
							</div>				
						</div>

					</section>
					
<?php
	require_once ("default-footer.php");
?>