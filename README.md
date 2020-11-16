# java编写规范及注意事项

### 1.注释

```java
常见注释有三种  //   /**/  /****/ 
```

如何才能写出漂亮的注释呢，注释的目的就是为了使你的代码让人更容易理解和维护，写一手好的注释是一个优秀码农的基本体现

==注释规范==

- 注释应该增加代码的清晰度，能一针见血
- 保持注释的简洁，多余的不要写
- 写代码之前应该先注释好，列好各个步骤，然后根据步骤编写
- 注释你写的内容所要实现的目标，方便目标明确

==注释场景==

- 类，类目的，类功能，变量
- 接口，接口目的，接口功能，使用场景
- 参数，参数含义，约束，使用条件
- 字段，字段描述
- 方法使用步骤

接口类型的代码可以用 //空格（介绍）来进行介绍，占用的空间小，容易解释功能

![image-20201114104738239](https://img-blog.csdnimg.cn/2020111617431345.png#pic_center)

```
/*和/**的区别
/*多行注释
/**Javadoc注释并且可以设置显示标明，创建者，创建时间，版本，以及该类的作用
```

Idea设置该模板：File->Settings->Editor->File and Code Templates->Includes->File Header

Eclipse设置该模板：window->perference->Java->Code Style->Code Template->Comments->Overriding methods

若想进一步了解，请参考[javadoc使用详解](https://blog.csdn.net/vbirdbest/article/details/80296136)

![image-20201114114050262](https://img-blog.csdnimg.cn/20201116174343847.png#pic_center)

### 2.类

==单一职责原则==

对于一个类，只要承担对应的功能即可，如果一个类承担的功能太多了，那么**它的交融、耦合性就会越高，被复用的可能性就会越低**，所以这样写一个类，那就像埋了一个雷，以后无论修改，或者是其他的问题，都会很麻烦

==类方法，变量，命名规范==

现在代码开发中最常见的命名规范就是**驼峰命名法**

类名，接口名：第一个字母通常大写

方法名，变量名：第一个字母小写

常量名：全大写

==私有化==

我们尽量不要直接操作属性，而且有些属性我们也不喜欢被改动，这样就把属性设置为private

一般用private修饰的属性，我们都会为其添加get和set方法，来进行封装

私有化，是为了安全，私有变量和私有类，就是只能在本类里面可以访问，而其他地方访问不到

==命名规范==

- 尽量使用完整的英文描述
- 使用驼峰命名法提高名字的可读性，能一眼看出该名称代表什么
- 避免使用太长的名字
- 能不用缩写，尽量不要用缩写，很多时候容易忘记缩写意义，如果使用要在工程中统一
- 避免使用下划线，静态常量可以使用
- 有相关术语尽量用相关术语

![image-20201114120020815](https://img-blog.csdnimg.cn/20201116174410781.png#pic_center)

### 3.异常

什么是异常？程序执行的过程中未按照预想流程执行的状态就是异常，通常分为两种

==系统异常==： 这类异常通常是大致地提示使用方系统不可用，同时需要相关人员更进处理的
==非系统异常==：这类异常通常是一些义务逻辑而已，比如检查到用户参数有误后抛出的异常

异常规范：

- 一次对大量try-catch，这种就是不负责任的表现。这样虽然使用起来简单，但是会提升程序的复杂度，从而导致分析异常原因的难度也大大增加

- catch时分清稳定代码和非稳定代码，**稳定代码**：无论如何都不会出错的代码，**非稳定代码**：随时有可能出错
- 异常不要用来做流程控制，条件控制，因为异常的处理效率比条件分支低
- 所有捕获的异常都要进行处理，可以进行数据库日志记录，抛出给其调用者并用枚举反馈为用户能理解的内容，能修复的尽量修复
- 如果try-catch捕获到异常，需要回滚事务，一定要手动回滚
- 不能在finally中使用return，因为finally语句块都会被执行到,这样try程序块中执行正常也会在finally中退出,不会再回到try程序块中
- catch能精细化最好精细化，分门分类处理，范围越小的exception要放在越前面，越大的放越后面，这样能更高效的确定哪里出问题了，尽量避免直接使用Exception
- **不要过度使用异常**这样会导致运行效率变得缓慢
- finally层用来关闭和释放资源
- 遇到循环，不要在循环中使用try-catch，应该放在最外层

==捕获异常最优实现==

- 使程序得代码复杂度减小
- 捕获并且记录异常信息
- 不同的异常通知合适的人员
- 采用合理的方式去结束异常活动

### 4.编写

==嵌套==

for,while,if,switch等

所有这些层级最好不要超过三层，有条件不成立直接return，不再向下执行

==非空判断==

错误例子：

```
if(user.getUserName().equals("hollis")){
}
```

　　这段代码极有可能在实际运行的时候跑出`NullPointerException`。无论是user本身为空，还是user.getUserName()为空，都会抛出异常。 所以，在调用一个参数时要确保他是非空的。

如果有更好的选择，应该使用Collection.isEmpty()检测空值

> 使用 Collection.size() 来检测空逻辑上没有问题，但是使用 Collection.isEmpty()使得代码更易读，并且可以获得更好的性能。任何 Collection.isEmpty() 实现的时间复杂度都是 O(1) ，但是某些 Collection.size() 实现的时间复杂度可能是 O(n) 。

上面的代码可以改为：

```
if(user!=null&&"hollis".equals(user.getUserName())){
}
```

 ==拼接==

在循环中拼接一个String对象，从性能来说StringBuffer比String效率要高

```java
// 普遍使用方法
String str = "";
for (int i = 0; i < list.length; ++i) {
    str = str + list[i]；
}
```

```java
// 优化后
StringBuffer buf = new StringBuffer();
for (int i = 0; i < list.length; ++i) {
   buf.append(list[i]);
}
String str = buf.toString();
```

==字符串转化==

字符串转换是编写中经常要遇到的，一般有如下三种转换形式

```java
String str=str + "";
String str=String.valueOf(str);
String str=str.toString();
```

其中toString转换效率是最高的，也是最方便的

==减少对变量的重复计算==

明确一个概念，对方法的调用，即使方法中只有一句语句，也是有消耗的，包括创建栈帧、调用方法时保护现场、调用方法完毕时恢复现场等

```java
for (int i = 0; i < list.size(); i++){
     ...
}
```

优化后

```java
for (int i = 0, length = list.size(); i < length; i++){
　　...
}
```

这样在list.size()很大的时候，就减少了很多的消耗

==懒加载策略==

如果有进行判断，在判断直接就创建内容和判断之后创建内容是不一样的，这样可以避免不必要的资源消耗

例如：

```java
String str = "aaa";
if (i == 1)
{
　　list.add(str);
}
```

建议替换为：

```java
if (i == 1)
{
　　String str = "aaa";
　　list.add(str);
}
```

==位移操作符==

乘除法可以使用位移运算符，就是直接对整数在内存中的二进制位进行操作

例如：

```java
for (val = 0; val < 100000; val += 5)
{
　　a = val * 8;
　　b = val / 2;
}
```

用移位操作可以极大地提高性能，因为在计算机底层，对位的操作是最方便、最快的，因此建议修改为：

```java
for (val = 0; val < 100000; val += 5)
{
　　a = val << 3;
　　b = val >> 1;
}
```

移位操作虽然快，但是可能会使代码不太好理解，因此最好加上相应的注释。

```java
其中<<3,指的是2的3次方
   >>1,指的是2的1次方
都是2的倍数
```

==对象引用==

在循环中不要不断的创建对象引用

例如：

```java
for (int i = 1; i <= count; i++)
{
  Object obj = new Object();    
}
```

这种做法会导致内存中有count份Object对象引用存在，count很大的话，就耗费内存了，建议为改为：

```java
Object obj = null;
for (int i = 0; i <= count; i++)
{
  obj = new Object();
}
```

这样的话，内存中只有一份Object对象引用，每次new Object()的时候，Object对象引用指向不同的Object罢了，但是内存中只有一份，这样就大大节省了内存空间了。

==单例==

使用单例可以**减轻加载的负担**、**缩短加载的时间**、**提高加载的效率**，但并不是所有地方都适用于单例，简单来说，单例主要适用于以下三个方面：

- 控制资源的使用，通过线程同步来控制资源的并发访问
- 控制实例的产生，以达到节约资源的目的
- 控制数据的共享，在不建立直接关联的条件下，让多个不相关的进程或线程之间实现通信

==静态变量==

要知道，当某个对象被定义为static的变量所引用，那么gc通常是不会回收这个对象所占有的堆内存的，如：

```java
public class A
{
  private static B b = new B();  
}
```

此时静态变量b的生命周期与A类相同，如果A类不被卸载，那么引用B指向的B对象会常驻内存，直到程序终止

==同步==

由于同一进程的多个线程共享同一块存储空间，在带来方便的同时，也带来了访问冲突问题，为了保证数据在方法中被访问时的正确性，在访问时加入==锁机制synchronized==，当一个线程获得对象的排它锁，独占资源，其他线程必须等待，使用后释放锁即可，存在以下问题：

- 一个线程持有锁会导致其他所有需要此锁的线程挂起
- 在多线程竞争下，加锁，释放锁会导致比较多的上下文切换和调度延时，引起性能问题
- 如果一个优先级高的线程等待一个优先级低的线程释放锁，会导致优先级倒置，引起性能问题。

- 由于我们可以用过private关键字来保证数据对象只能被方法访问，所以我们只需要针对方法提出一套机制，这套机制就是synchronized关键字，它包括两种用法：synchronized方法和synchronized块

  ```
  同步方法：public synchronized void method(int args){}
  ```

- synchronized方法控制对象的访问，每个对象对应一把锁，每个synchronized方法都必须获得调用该方法的对象的锁才能执行，否则线程会阻塞，方法一旦执行，就独占该锁，直到该方法返回才释放锁，后面被阻塞的线程才能获得这个锁，继续执行

  ```java
  缺陷：==若将一个大的方法申明为synchronized将会影响效率==
  ```

  ==锁的对象就是变化的量，需要增删改的对象==

 **同步方法弊端**

- 方法里面需要修改的内容才需要锁，锁的太多，浪费资源

同步代码块可以用更细粒度的控制锁,比如：

```java
public class Test{
    private String name = "li";
    private String id = "007";
    public void setName(String name) {
        synchornized(name) {
            this.name = name;
        }
    }
    public void setId(String id) {
        synchornized(id) {
            this.id = id;
        }
    }
}
```

==程序运行过程中避免使用反射==

　　反射是Java提供给用户一个很强大的功能，功能强大往往意味着效率不高。不建议在程序运行过程中使用尤其是频繁使用反射机制，特别是Method的invoke方法，如果确实有必要，一种建议性的做法是将那些需要通过反射加载的类在项目启动的时候通过反射实例化出一个对象并放入内存—-==用户只关心和对端交互的时候获取最快的响应速度==，并不关心对端的项目启动花多久时间。



==使用带缓冲的输入输出流进行IO操作==

带缓冲的输入输出流，即BufferedReader、BufferedWriter、BufferedInputStream、BufferedOutputStream，这可以极大地提升IO效率



==公用的集合类中不使用的数据一定要及时remove掉==

如果一个集合类是公用的（也就是说不是方法里面的属性），那么这个集合里面的元素是不会自动释放的，因为始终有引用指向它们。所以，如果公用集合里面的某些数据不使用而不去remove掉它们，那么将会造成这个公用集合不断增大，使得系统有内存泄露的隐患。



==Map遍历==

遍历Map的方式有很多，通常场景下我们需要的是遍历Map中的Key和Value，那么推荐使用的、效率最高的方式是：

```java
public static void main(String[] args)
{
  HashMap<String, String> hm =  new HashMap<String, String>();
  hm.put( "111" ,  "222" );
  Set<Map.Entry<String, String>> entrySet = hm.entrySet();
  Iterator<Map.Entry<String, String>> iter = entrySet.iterator();
  while (iter.hasNext())
  {
  　　Map.Entry<String, String> entry = iter.next();
  　　System.out.println(entry.getKey() +  " " + entry.getValue());
  }
}
```

如果你只是想遍历一下这个Map的key值，那用”Set<String> keySet = hm.keySet();”会比较合适一些。

```java
Map<String, String> map = ...;
for (String key : map.keySet()) {
    ...
}
```

如果需要获取主键和取值，迭代entrySet()才是更加高效的做法

```java
Map<String, String> map = ...;
for (Map.Entry<String, String> entry : map.entrySet()) {
    String key = entry.getKey();
    String value = entry.getValue();
    ...
}
```

==Random==

避免Random实例被多线程使用，虽然该线程是安全的，但是会因为竞争同一个seed而导致性能下降，JDK7之后，可以使用ThreadLocalRandom来获取随机数



==金额运算==

```java
@Test
    public void test4() {
        double num1 = 0.02d;
        double num2 = 0.03d;
        double num3 = num2 - num1;
        System.out.println(num3);
    }
```

console结果： 0.009999999999999998

　　为什么会这样呢? 因为float和double都是浮点数, 都有取值范围, 都有精度范围. 浮点数与通常使用的小数不同, 使用中, 往往难以确定. 常见的问题是定义了一个浮点数, 经过一系列的计算, 它本来应该等于某个确定值, 但实际上并不是! 金额必须是完全精确的计算, 故不能使用double或者float, 而应该采用java.math.BigDecimal.

　　使用BigDecimal的add, substract, multiply和divide做加减乘除, 用compareTo方法比较大小

```java
@Test
    public void test4() {
        BigDecimal num1 = new BigDecimal("0.02");
        BigDecimal num2 = new BigDecimal("0.03");
        
        //加
        System.out.println(num1.add(num2));
        //减
        System.out.println(num2.subtract(num1));
        //乘
        System.out.println(num1.multiply(num2));
        //除
        System.out.println(num1.divide(num2, RoundingMode.HALF_UP));
        
        BigDecimal num3 = new BigDecimal("0.03");
        if(num3.compareTo(BigDecimal.ZERO) == -1) {
            System.out.println("num3 小于0");
        }else if(num3.compareTo(BigDecimal.ZERO) == 1) {
            System.out.println("num3大于0");
        }else if(num3.compareTo(BigDecimal.ZERO) == 1) {
            System.out.println("num3等于0");
        }
        
        BigDecimal num4 = new BigDecimal("0.1234567");
        //其中setScale的第一个参数是小数位数, 这个示例是保留2位小数, 后面是四舍五入规则.
        System.out.println("num4:" + num4.setScale(2, BigDecimal.ROUND_UP));
    }
```

console结果：

0.05
0.01
0.0006
0.67
num3大于0
num4:0.13



==获取时间差==

　　阿里巴巴手册建议：

![img](https://img2018.cnblogs.com/blog/885859/201907/885859-20190731145456116-226527744.png)

计算两段代码时间差，很多同学公司的代码是采用以下这种方式。

```
long startTime = System.currentTimeMillis();
// 执行代码
long endTime = System.currentTimeMillis();
System.out.println(endTime - startTime);
```

这种方式并不是不行。按照“能跑就行”的原则，这段代码，肯定是能用的！但是这并不是最佳实践，为何？ 我们先来看一下JDK中的注释

 ![img](https://img2018.cnblogs.com/blog/885859/201907/885859-20190731145844683-945389476.png)

我们来看另外一种方式。

```
long startTime = System.nanoTime();
// 执行代码
long endTime = System.nanoTime();
System.out.println(endTime - startTime);
```

我们再来看看注释：

 ![img](https://img2018.cnblogs.com/blog/885859/201907/885859-20190731145925216-1128484000.png)

 

==list随机访问==

大家都知道数组和链表的区别：

​	数组的随机访问效率更高。当调用方法获取到 List 后，如果想随机访问其中的数据，并不知道该数组内部实现是链表还是数组，怎么办呢？可以判断它是否实现* RandomAccess *接口。

```java
// 调用别人的服务获取到list
List<Integer> list = otherService.getList();
if (list instanceof RandomAccess) {
    // 内部数组实现，可以随机访问
    System.out.println(list.get(list.size() - 1));
} else {
    // 内部可能是链表实现，随机访问效率低
}
```



==魔法值==

当你编写一段代码时，使用魔法值可能看起来很明确，但在调试时它们却不显得那么明确了。这就是为什么需要把魔法值定义为可读取常量的原因。但是，-1、0 和 1不被视为魔法值。

**反例：**

```java
for (int i = 0; i < 100; i++){
    ...
}
if (a == 100) {
    ...
}
```

**正例：**

```java
private static final int MAX_COUNT = 100;
for (int i = 0; i < MAX_COUNT; i++){
    ...
}
if (count == MAX_COUNT) {
    ...
}
```



==枚举==

​	枚举通常被当做常量使用，如果枚举中存在公共属性字段或设置字段方法，那么这些枚举常量的属性很容易被修改。

```java
private String description;
```

​	理想情况下，枚举中的属性字段是私有的，并在私有构造函数中赋值，没有对应的 Setter 方法，最好加上 final 修饰符。

```java
private final int value;
```



==split截取==

字符串 String 的 split 方法，传入的分隔字符串是 ==正则表达式==！部分关键字（比如.[]()\| 等）需要转义

**反例：**

```
"a.ab.abc".split("."); // 结果为[]
"a|ab|abc".split("|"); // 结果为["a", "|", "a", "b", "|", "a", "b", "c"]
```

**正例：**

```
"a.ab.abc".split("\\."); // 结果为["a", "ab", "abc"]
"a|ab|abc".split("\\|"); // 结果为["a", "ab", "abc"]
```



### 5.总结

- 项目中已经改过的错误注释，方法，类，用不到的及时删掉，不要当宝贝一样，占用内存，而且容易误导，使代码的复杂度直线上升

- 如果同一段逻辑出现了两次及以上，你就要考虑把该段抽取出来，可以减少重复编写

- 如果遇到解决不了的问题，加一层调用试试?
- 遇到比较深度的树节点，用递归省事而且效率高

如果有一定的基础，可以去使用一些框架，这样可以极大的提升自己的开发效率，毕竟是站在前人的肩膀上，但是一定要知道框架的一些基本实现形式，任何新技术，绝不可能只是覆盖了原来的技术，都有自己的优势和补充



参考：

[java编程规范](https://www.cnblogs.com/myseries/p/10694246.html)

[java开发代码规范之异常日志](https://blog.csdn.net/rongxiang111/article/details/78406629?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.channel_param)

