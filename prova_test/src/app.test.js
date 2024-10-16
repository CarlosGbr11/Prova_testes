const { getAlunoById, connection } = require('./db');

describe('Testes para getAlunoById', () => {
    beforeAll(async () => {
        await connection.query('CREATE TABLE IF NOT EXISTS alunos (idalunos INT AUTO_INCREMENT PRIMARY KEY, mat_aluno INT, nome_aluno VARCHAR(150) NOT NULL, data_nascimento DATE NOT NULL, endereco_aluno VARCHAR(45), bairro_aluno VARCHAR(45), num_aluno VARCHAR(45), cidade_aluno VARCHAR(45), email VARCHAR(255))');
        await connection.query("INSERT INTO alunos (mat_aluno, nome_aluno, data_nascimento, endereco_aluno, bairro_aluno, num_aluno, cidade_aluno, email) VALUES (20150101, 'JOSE DE ALENCAR', '1990-01-01', 'RUA DAS ALMAS', 'CALU', '12345678', 'NATAL', 'jose@mail.com')");
        await connection.query("INSERT INTO alunos (mat_aluno, nome_aluno, data_nascimento, endereco_aluno, bairro_aluno, num_aluno, cidade_aluno, email) VALUES (20000000, 'IVAN', '1995-05-05', 'RUA B', 'A', '12345678', 'ALAGOINHAS', 'ivan@mail.com')");
    });

    test('1- Campos obrigatórios não podem ser nulos', async () => {
        const aluno = await getAlunoById(1);
        expect(aluno.nome_aluno).not.toBeNull();
        expect(aluno.data_nascimento).not.toBeNull();
        expect(aluno.mat_aluno).not.toBeNull();
    });

    test('2- O email deve estar em um formato válido', async () => {
        const aluno = await getAlunoById(1);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(aluno.email).toMatch(emailRegex);
    });

});