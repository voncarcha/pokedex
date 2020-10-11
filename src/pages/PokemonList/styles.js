import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }

  > header {
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    flex-direction: column;
    aside {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      img {
        width: 50px;
        margin-right: 20px;
      }
    }
    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #f71b1b;

      span {
        color: #333;
      }
    }
  }
  > section {
    max-width: 1200px;
    margin: auto;
    width: 100%;

    .pokemon-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 20px;
      row-gap: 20px;

      @media (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
  > footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 30px auto 0;
    width: 100%;
    max-width: 1200px;

    .ant-tag {
      margin-top: 20px;
    }
  }
`;

export const Loader = styled.div`
  width: 100%;
  height: 80vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    font-size: 50px;
    color: blue;
  }
`;
