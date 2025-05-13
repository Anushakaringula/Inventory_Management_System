/*import java.util.*;
class Zero
{
	public static void main(String args[])
	{
		int[]a =new int[]{0,2,3,0,0,5,0};
		int[] b=new int[a.length];
		int j=0;
		for(int i=0;i<a.length;i++)
		{
			if(a[i]!=0)
			{
				b[j++]=a[i];
			}
		}
		while(j!=a.length)
		{
			b[j]=0;
			j++;
		}
		for(int i=0;i<a.length;i++)
		{
			System.out.print(b[i]);
		}
	}
}*/
import java.util.*;
class Zero
{
	public static void main(String args[])
	{
		int[]a =new int[]{1,0,3,2,0,5,0};
		int[] b=new int[a.length];
		int j=0;
		for(int i=0;i<a.length;i++)
		{
			if(a[i]!=0)
			{
				a[j]=a[i];
				j++;
			}
		}
		while(j!=a.length)
		{
			a[j]=0;
			j++;
		}
		for(int i=0;i<a.length;i++)
		{
			System.out.print(a[i]);
		}
	}
}												
