// src/pages/Terms.jsx
import styles from './Termspage.module.css';

export default function Termspage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Termos e Condições de Uso</h1>

      <p>
        Bem-vindo ao <strong>Promodomo</strong>, um portal 100% colaborativo focado na divulgação de promoções 
        publicadas por seus próprios usuários. Não temos vínculo com lojas ou marcas, e não vendemos qualquer produto 
        ou serviço.
      </p>

      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao acessar ou utilizar o Promodomo, você concorda com estes Termos de Uso, nossa Política de Privacidade 
        e todas as leis aplicáveis. Caso não concorde, recomendamos que interrompa o uso da plataforma.
      </p>

      <h2>2. Participação dos Usuários</h2>
      <p>
        O conteúdo publicado pelos usuários deve ser verdadeiro, respeitoso e não violar direitos de terceiros. 
        O Promodomo se reserva o direito de moderar ou remover conteúdos que infrinjam estas diretrizes.
      </p>

      <h2>3. Isenção de Responsabilidade</h2>
      <p>
        O Promodomo não garante a veracidade, disponibilidade ou validade das promoções cadastradas. O usuário 
        deve sempre confirmar diretamente com a loja responsável. Não nos responsabilizamos por erros, cancelamentos 
        ou alterações nas promoções divulgadas.
      </p>

      <h2>4. Propriedade e Uso de Dados</h2>
      <p>
        As informações publicadas são de responsabilidade de seus autores. Podemos utilizar cookies e ferramentas 
        de análise para melhorar a experiência dos usuários, conforme nossa Política de Privacidade.
      </p>

      <h2>5. Modificações</h2>
      <p>
        Estes Termos podem ser alterados a qualquer momento, sendo sua versão atualizada sempre publicada nesta página. 
        O uso contínuo da plataforma indica concordância com as alterações.
      </p>
    </div>
  );
}
