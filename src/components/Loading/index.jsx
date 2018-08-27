import React from "react";
import styles from "./styles.scss";

import { BarLoader } from 'react-spinners';

export default () => <div className={ styles.bottomRight }><BarLoader size={ 25 } color={'#14fdce'} /></div>;
