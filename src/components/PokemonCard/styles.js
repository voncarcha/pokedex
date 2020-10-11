import styled from 'styled-components';

export const Wrapper = styled.div`
  @media (max-width: 600px) {
    max-width: 350px;
    width: 100%;
    margin: auto;
  }
  .ant-card-cover {
    background: #f1f1f1;
    padding: 30px 0;
    min-height: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-card-cover img {
    width: 90%;
    object-fit: contain;
    height: 90%;
    max-height: 150px;
    margin: auto;
  }
  .ant-card-meta-title {
    text-transform: uppercase;
    text-align: center;
  }
  .tag {
    margin-top: 10px;
    text-align: center;
  }
`;

export const Loader = styled.div`
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
