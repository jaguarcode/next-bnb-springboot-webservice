import App, { AppContext, AppProps } from "next/app";
import axios from "../lib/api";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { cookieStringToObject } from "../lib/utils";
import { getUser } from "../lib/api/user";
import { wrapper } from "../store";
import { userActions } from "../store/user";
import "react-datepicker/dist/react-datepicker.css";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await axios.get("/api/users/me");
      store.dispatch(userActions.setUser(data));
    }
  } catch (e) {
    console.log(e);
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(app);
