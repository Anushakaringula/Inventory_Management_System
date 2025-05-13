import java.util.*;
class MaxConOnes
{
	public static void main(String args[])
	{
		int[] a=new int[]{1,1,1,0,0,1,1,0,1,1,1,1,0,1,1};
		int count=0;
		int max=0;
		for(int i=0;i<a.length;i++)
		{
			if(a[i]==1)
			{
				count++;
				if(count>max)
				{
					max=count;
				}
			}
			else
			{
				count=0;
			}
		}
		System.out.print("max consecutive ones are:"+max);
	}
}						
