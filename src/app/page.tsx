import Image from 'next/image'
import { Fragment } from 'react';
import { Input } from "./components/Input";
import { List } from "./components/List";
export default function Home() {
  return (
    <Fragment>
     <section>
      <Input></Input>
      <List></List>
     </section>
    </Fragment>
  )
}
