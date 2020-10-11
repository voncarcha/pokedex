import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
  > section {
    max-width: 1200px;
    margin: auto;
    width: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #f1f1f1;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #f71b1b;
    text-transform: uppercase;
    margin-left: 20px;
    @media (max-width: 600px) {
      font-size: 18px;
      margin-left: 10px;
    }

    span {
      color: #333;
      margin-right: 10px;
    }
  }
  .tag {
    text-align: center;
    text-transform: uppercase;
  }
  > section {
    display: flex;
    align-items: center;
  }
`;

export const Content = styled.div`
  padding: 30px;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 600px) {
      flex-direction: column;
    }

    > figure {
      flex: 0 0 350px;
      height: 300px;
      @media (max-width: 900px) {
        flex: 0 0 200px;
      }

      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
    > article {
      flex: 1;
      margin-left: 30px;
      @media (max-width: 600px) {
        margin: 20px 0 0 0;
      }

      h3 {
        margin-bottom: 30px;
      }

      > aside {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

export const Stats = styled.div`
  > section {
    display: flex;
    align-items: center;
  }
  .stat-label {
    flex: 0 0 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;

    small {
      font-size: 10px;
      text-transform: uppercase;
      color: #333;
      font-weight: 700;
    }
  }
`;

export const Loader = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    font-size: 50px;
    color: blue;
  }
`;

export const ImageLoader = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    font-size: 50px;
    color: blue;
  }
`;