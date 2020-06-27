/*
  全站右边栏
*/
import React from "react";
import { useRouter } from "next/router";
import {
  Chrome,
  ChevronsRight,
  Github,
  Facebook,
  Twitter,
} from "@zeit-ui/react-icons";
import { Button, AutoComplete, useClipboard, useToasts } from "@zeit-ui/react";
// 全局配置
import odoc from "../../odoc.config";

// 搜索引索
import searchIndex from "../data/searchindex.json";

function RightSide() {
  const router = useRouter();

  // 剪贴板访问
  const { copy } = useClipboard();
  // 提示组件
  const [, setToast] = useToasts();

  /* 搜索配置 */
  const allOptions = searchIndex;
  /* 
    NOTE:在函数组件中使用状态
    [name,function] = React.useState<nameType>()
  */
  const [options, setOptions] = React.useState<any>();
  let [searchValue, setValue] = React.useState<string>();
  // 搜索回调
  const searchHandler = (currentValue: string) => {
    if (currentValue) {
      const relatedOptions = allOptions.filter((item) =>
        item.value.includes(currentValue)
      );
      setOptions(relatedOptions);
    }
  };
  // 选择回调
  const selectHandler = (selectedValue: string) => {
    if (selectedValue) {
      router.push(selectedValue);
      setValue(selectedValue.replace("/posts/", ""));
    }
  };
  /* 搜索配置 */

  return (
    <div className="inside">

      <h3>Search</h3>
      <AutoComplete
        options={options}
        value={searchValue}
        placeholder="Search..."
        onSearch={searchHandler}
        onSelect={selectHandler}
        clearable
        width="233px"
        size="large"
      />
      
      <h3>Share</h3>
      <div className="card">
        <div className="icon">
          <Chrome /> <p>Copy URL</p>
        </div>
        <div>
          <Button
            auto
            type="success"
            onClick={() => {
              copy(odoc.onlineSiteUrl + router.pathname);
              setToast({ text: "URL copied", type: "success" });
            }}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <Facebook /> <p>Facebook</p>
        </div>
        <div>
          <Button auto type="success">
            <ChevronsRight />
          </Button>
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <Twitter /> <p>Twitter</p>
        </div>
        <div>
          <Button auto type="success">
            <ChevronsRight />
          </Button>
        </div>
      </div>

      <h3>Source</h3>
      <div className="card">
        <div className="icon">
          <Github /> <p>Repository</p>
        </div>
        <div>
          <Button auto type="success">
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
