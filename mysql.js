//  c:\back.bmp
// Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
-- or
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
-- then
FLUSH PRIVILEGES;

// 修改MYSQL初始密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456' PASSWORD EXPIRE NEVER;
之后使用以下指令刷新权限：flush privileges;    注意指令末尾的分号。

// 登录 MySQL
mysql -h 主机名 -u 用户名 -p
参数说明：
-h : 指定客户端所要登录的 MySQL 主机名, 登录本机(localhost 或 127.0.0。1)该参数可以省略;
-u : 登录的用户名;
-p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。
 
// MySQL 用户设置  如果你需要添加 MySQL 用户，你只需要在 mysql 数据库中的 user 表添加新用户即可。
// 添加具有本地(localhost/127.0.0.1)访问权限的用户
create user 'zad'@'localhost' identified by '123456';
// 删除用户
DELETE FROM user WHERE User="test" and Host="localhost";
flush privileges;
drop database testDB;
// 还可以
CREATE USER username IDENTIFIED BY 'password';
// 删除账户及权限：
DROP USER username;
drop user 用户名@’%’;
drop user 用户名@'localhost';

// create user  test@'localhost' identified  by '123456'; #本地登录
// create user  test@'%'  identified  by '1234'; #远程登录
 
// 为新用户分配本地权限，可以指定数据库dbname和表名，可以用*替指所有
grant all privileges on testDB.* to test@'localhost' identified by  '123456';
flush privileges; #刷新系统权限表

grant all privileges on zhangsanDb.* to zhangsan@'%' identified by 'zhangsan';
grant select,delete,update,create,drop on *.* to test@'%'; // ”%” 表示对所有非本地主机授权，不包括localhost
// grant all privileges on testdb to test@'localhost';  这个不报错...
// revoke all privileges on testdb from test@'localhost';
// FLUSH PRIVILEGES;    flush privileges;

查看 MySQL 用户权限  查看当前用户（自己）权限：  show grants;
查看其他 MySQL 用户权限：  show grants for dba@localhost;

撤销已经赋予给 MySQL 用户权限的权限。 revoke 跟 grant 的语法差不多，只需要把关键字 to 换成 from 即可：
grant all on *.* to dba@localhost;
revoke all on *.* from dba@localhost;
//  grant, revoke 用户权限后，该用户只有重新连接 MySQL 数据库，权限才能生效。
// //  注意：创建完成后需要执行 FLUSH PRIVILEGES 语句。

修改指定用户密码
mysql -u root -p
update mysql.user set authentication_string=password('新密码') where user='test' and  host='localhost';
flush privileges;

SELECT host, user, authentication_string FROM user WHERE user = 'test';
SELECT Host, User, authentication_string from user;

SHOW COLUMNS FROM 数据表:
显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。  SHOW COLUMNS FROM runoob_tbl;
// SHOW INDEX FROM 数据表:
显示数据表的详细索引信息，包括PRIMARY KEY（主键）。
// SHOW TABLE STATUS LIKE [FROM db_name] [LIKE 'pattern'] \G:
该命令将输出Mysql数据库管理系统的性能及统计信息。
// mysql> SHOW TABLE STATUS  FROM RUNOOB;   # 显示数据库 RUNOOB 中所有表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%';     # 表名以runoob开头的表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%'\G;   # 加上 \G，查询结果按列打印
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 