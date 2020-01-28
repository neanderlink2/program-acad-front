export const csharpDefault = `using System;
public class Program 
{
    public static void Main(string[] args) 
    {
        Console.WriteLine("Olá mundo");
    }
}`;

export const javaDefault = `public class Main
{
    public static void main(String[] args) 
    {
        System.out.println("Olá mundo");
    }
}`;

export const pythonDefault = `print('Olá mundo')`;

export const javascriptDefault = `//Saída
console.log("Olá mundo")
//Entrada
const stdin = process.openStdin();
stdin.addListener("data", function(input) {
    console.log(\`Entrada Teste: \${input}\`);
  });`;