-- Crie o gatilho para registrar apólices deletadas
CREATE OR REPLACE TRIGGER td_apolice AFTER DELETE ON apolices FOR EACH ROW EXECUTE FUNCTION log_deleted_apolice();

-- Gatilho para evitar cpf duplicado na tabela de clientes
CREATE OR REPLACE TRIGGER prevent_duplicate_client_cpf_trigger BEFORE INSERT ON clients FOR EACH ROW EXECUTE FUNCTION prevent_duplicate_client_cpf();

-- Trigger para evitar imei duplicado na tabela celulares
CREATE OR REPLACE TRIGGER prevent_duplicate_celular_imei_trigger BEFORE INSERT ON celulares FOR EACH ROW EXECUTE FUNCTION prevent_duplicate_celular_imei();

-- Gatilho para evitar números duplicados na tabela apolices
CREATE OR REPLACE TRIGGER prevent_duplicate_apolice_numero_trigger BEFORE INSERT ON apolices FOR EACH ROW EXECUTE FUNCTION prevent_duplicate_apolice_numero();
